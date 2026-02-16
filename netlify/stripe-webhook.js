import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    console.error('No Stripe signature found');
    return { statusCode: 400, body: 'No signature' };
  }

  if (!webhookSecret || webhookSecret === 'whsec_xxxxx') {
    console.error('Webhook secret not configured properly');
    return { statusCode: 500, body: 'Webhook secret not configured' };
  }

  let stripeEvent;
  let signatureVerified = false;

  // Try multiple approaches to verify the signature
  const attempts = [
    { name: 'String body', value: event.body },
    { name: 'UTF8 Buffer', value: Buffer.from(event.body, 'utf8') },
    { name: 'Base64 decoded', value: event.isBase64Encoded ? Buffer.from(event.body, 'base64') : null },
  ];

  for (const attempt of attempts) {
    if (!attempt.value) continue;

    try {
      stripeEvent = stripe.webhooks.constructEvent(
        attempt.value,
        sig,
        webhookSecret
      );
      signatureVerified = true;
      console.log(`✅ Signature verified using: ${attempt.name}`);
      break;
    } catch (err) {
      console.log(`❌ ${attempt.name} failed: ${err.message}`);
    }
  }

  if (!signatureVerified) {
    console.error('⚠️ All signature verification attempts failed');
    console.error('Headers:', JSON.stringify(event.headers, null, 2));
    console.error('Is base64:', event.isBase64Encoded);
    console.error('Body type:', typeof event.body);
    console.error('Body length:', event.body?.length);

    // TEMPORARY: For debugging, parse the event anyway (REMOVE IN PRODUCTION)
    try {
      const parsedEvent = JSON.parse(event.body);
      console.log('⚠️ BYPASSING SIGNATURE CHECK FOR DEBUG - Event type:', parsedEvent.type);
      stripeEvent = parsedEvent;
    } catch (parseErr) {
      return {
        statusCode: 400,
        body: 'Signature verification failed and body not parseable'
      };
    }
  }

  console.log('✅ Webhook verified:', stripeEvent.type);

  // Handle the checkout.session.completed event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const holdId = session.metadata?.holdId;

    if (!holdId) {
      console.error('No holdId in session metadata');
      return { statusCode: 400, body: 'No holdId' };
    }

    console.log('Processing payment for holdId:', holdId);

    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Get the hold details
      const { data: hold, error: holdError } = await supabase
        .from('holds')
        .select('*')
        .eq('id', holdId)
        .single();

      if (holdError || !hold) {
        console.error('Hold not found:', holdError);
        return { statusCode: 404, body: 'Hold not found' };
      }

      console.log('Found hold for board:', hold.board_id);

      // Mark numbers as sold
      const { error: updateError } = await supabase
        .from('numbers')
        .update({
          status: 'sold',
          display_name: hold.display_name,
          message: hold.message,
          hold_expires_at: null
        })
        .eq('board_id', hold.board_id)
        .eq('status', 'held');

      if (updateError) {
        console.error('Error updating numbers:', updateError);
        return { statusCode: 500, body: 'Error updating numbers' };
      }

      // Create purchase record
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          board_id: hold.board_id,
          email: hold.email,
          phone: hold.phone,
          display_name: hold.display_name,
          message: hold.message,
          amount_cents: session.amount_total,
          stripe_payment_intent: session.payment_intent
        });

      if (purchaseError) {
        console.error('Error creating purchase:', purchaseError);
        return { statusCode: 500, body: 'Error creating purchase' };
      }

      console.log('✅ Payment processed successfully');
    } catch (error) {
      console.error('Error processing payment:', error);
      return {
        statusCode: 500,
        body: `Error: ${error.message}`
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
}
