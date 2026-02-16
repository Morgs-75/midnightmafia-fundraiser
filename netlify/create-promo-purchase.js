import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Server-side validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  const phoneDigits = phone.replace(/\s/g, '');
  const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
  return phoneRegex.test(phoneDigits);
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { boardId, numbers, displayName, email, phone, message, promoCode } = JSON.parse(event.body);

    // Validate input
    if (!displayName || typeof displayName !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Display name is required' }) };
    }
    if (displayName.trim().length < 2 || displayName.trim().length > 50) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Display name must be 2-50 characters' }) };
    }
    if (!email || !validateEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Valid email is required' }) };
    }
    if (phone && !validatePhone(phone)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid phone number format' }) };
    }
    if (message && message.length > 200) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Message must be less than 200 characters' }) };
    }
    if (!Array.isArray(numbers) || numbers.length === 0 || numbers.length > 10) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Must select 1-10 numbers' }) };
    }
    if (!boardId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Board ID is required' }) };
    }

    // Validate promo code
    if (promoCode !== 'OUTLAWS') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid promo code' })
      };
    }

    // Check how many times this promo code has been used
    const { data: existingUses, error: countError } = await supabase
      .from('purchases')
      .select('id')
      .eq('board_id', boardId)
      .eq('promo_code', 'OUTLAWS');

    if (countError) {
      console.error('Error counting promo uses:', countError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to validate promo code' })
      };
    }

    // Check if limit reached (10 uses max)
    if (existingUses && existingUses.length >= 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Promo code limit reached. All 10 team spots have been claimed.' })
      };
    }

    // Check if adding these numbers would exceed the limit
    if (existingUses && (existingUses.length + numbers.length) > 10) {
      const remaining = 10 - existingUses.length;
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Only ${remaining} team spot${remaining === 1 ? '' : 's'} remaining. Please select ${remaining} or fewer numbers.`
        })
      };
    }

    // Check if numbers are available
    const { data: existingNumbers, error: checkError } = await supabase
      .from('numbers')
      .select('number, status')
      .eq('board_id', boardId)
      .in('number', numbers);

    if (checkError) {
      console.error('Error checking numbers:', checkError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to check number availability' })
      };
    }

    const unavailable = existingNumbers
      ?.filter(n => n.status !== 'available')
      .map(n => n.number) || [];

    if (unavailable.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          error: `Numbers ${unavailable.join(', ')} are no longer available`
        })
      };
    }

    // Create purchase record (FREE - amount_cents = 0)
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        board_id: boardId,
        email,
        phone: phone || null,
        display_name: displayName,
        message,
        amount_cents: 0, // FREE for team
        stripe_payment_intent: null, // No payment
        promo_code: 'OUTLAWS'
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create purchase' })
      };
    }

    // Mark numbers as sold with promo code
    const { error: updateError } = await supabase
      .from('numbers')
      .upsert(
        numbers.map(num => ({
          board_id: boardId,
          number: num,
          status: 'sold',
          display_name: displayName,
          message,
          promo_code: 'OUTLAWS', // Mark as team number
        })),
        { onConflict: 'board_id,number' }
      );

    if (updateError) {
      console.error('Error updating numbers:', updateError);
      // Rollback purchase
      await supabase.from('purchases').delete().eq('id', purchase.id);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to mark numbers as sold' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        purchaseId: purchase.id,
        message: 'Team purchase successful!'
      })
    };

  } catch (error) {
    console.error('Promo purchase error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
