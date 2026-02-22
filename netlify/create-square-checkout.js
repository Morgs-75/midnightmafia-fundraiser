import { SquareClient, SquareEnvironment } from 'square';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Pricing logic (mirrors src/lib/pricing.ts)
function calculatePrice(count) {
  if (count === 0) return 0;
  if (count <= 4) return count * 25;
  return 100 + ((count - 5) * 25);
}

function calculateTotalWithFees(subtotal) {
  return Math.ceil((subtotal / 0.978) * 100) / 100;
}

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'sandbox'
    ? SquareEnvironment.Sandbox
    : SquareEnvironment.Production,
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { holdId, quantity, amount } = JSON.parse(event.body);

    if (!holdId || !quantity || quantity < 1 || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request: holdId, quantity and amount required' }),
      };
    }

    // Validate quantity is a reasonable integer
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid quantity' }) };
    }

    // Server-side amount validation — prevent client-side price tampering
    const expectedSubtotal = calculatePrice(quantity);
    const expectedTotal = calculateTotalWithFees(expectedSubtotal);
    const expectedCents = Math.round(expectedTotal * 100);

    if (amount !== expectedCents) {
      console.error(`Amount mismatch: client sent ${amount} cents, expected ${expectedCents} cents for qty ${quantity}`);
      return { statusCode: 400, body: JSON.stringify({ error: 'Amount does not match expected price' }) };
    }

    // Verify the hold still exists and hasn't expired
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: hold, error: holdError } = await supabase
      .from('holds')
      .select('id, expires_at')
      .eq('id', holdId)
      .single();

    if (holdError || !hold) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Hold not found or expired. Please start over.' }) };
    }

    if (new Date(hold.expires_at) < new Date()) {
      return { statusCode: 410, body: JSON.stringify({ error: 'Hold has expired. Please select numbers again.' }) };
    }

    console.log('Creating Square payment link:', { holdId, quantity, amount });

    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      quickPay: {
        name: `Fundraiser Number${quantity > 1 ? 's' : ''} (${quantity})`,
        priceMoney: {
          amount: BigInt(expectedCents),
          currency: 'AUD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
      checkoutOptions: {
        redirectUrl: `${process.env.SITE_URL}/success.html`,
      },
      paymentNote: holdId,
    });

    const paymentLink = response.data?.paymentLink ?? response.paymentLink;

    if (!paymentLink?.url) {
      console.error('No payment link URL in response:', JSON.stringify(response, null, 2));
      throw new Error('No payment link URL returned from Square');
    }

    console.log('\u2705 Square payment link created:', paymentLink.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: paymentLink.url }),
    };
  } catch (error) {
    console.error('Error creating Square payment link:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment link', details: error.message }),
    };
  }
}
