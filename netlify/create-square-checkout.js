import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'sandbox'
    ? Environment.Sandbox
    : Environment.Production,
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

    console.log('Creating Square payment link:', { holdId, quantity, amount });

    const { result } = await client.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      quickPay: {
        name: `Fundraiser Number${quantity > 1 ? 's' : ''} (${quantity})`,
        priceMoney: {
          amount: BigInt(amount), // amount in cents, already includes fee
          currency: 'AUD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
      checkoutOptions: {
        redirectUrl: `${process.env.SITE_URL}/success.html`,
      },
      paymentNote: holdId, // stored on Payment.note for webhook correlation
    });

    console.log('✅ Square payment link created:', result.paymentLink.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: result.paymentLink.url }),
    };
  } catch (error) {
    console.error('Error creating Square payment link:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment link', details: error.message }),
    };
  }
}
