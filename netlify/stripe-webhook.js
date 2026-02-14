import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    return { statusCode: 400, body: err.message };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const holdId = session.metadata.holdId;

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: hold } = await supabase
      .from('holds')
      .select('*')
      .eq('id', holdId)
      .single();

    // Mark numbers sold
    await supabase
      .from('numbers')
      .update({
        status: 'sold',
        display_name: hold.display_name,
        message: hold.message,
        hold_expires_at: null
      })
      .eq('board_id', hold.board_id)
      .eq('status', 'held');

    await supabase.from('purchases').insert({
      board_id: hold.board_id,
      email: hold.email,
      phone: hold.phone,
      display_name: hold.display_name,
      message: hold.message,
      amount_cents: session.amount_total,
      stripe_payment_intent: session.payment_intent
    });
  }

  return { statusCode: 200 };
}
