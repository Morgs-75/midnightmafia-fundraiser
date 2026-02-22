import { createClient } from '@supabase/supabase-js';

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

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function handler(event) {
  const { numbers, displayName, email, phone, message, boardId } = JSON.parse(event.body);

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
  // Validate each number is an integer in range 1-200
  for (const num of numbers) {
    if (!Number.isInteger(num) || num < 1 || num > 200) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Numbers must be integers between 1 and 200' }) };
    }
  }
  if (!boardId || !uuidRegex.test(boardId)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid board ID' }) };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  // Ensure all numbers are available
  const { data: existing } = await supabase
    .from('numbers')
    .select('number,status')
    .in('number', numbers)
    .eq('board_id', boardId);

  if (existing.some(n => n.status !== 'available')) {
    return { statusCode: 409, body: JSON.stringify({ error: 'One or more numbers unavailable' }) };
  }

  // Create hold
  const { data: hold } = await supabase
    .from('holds')
    .insert({
      board_id: boardId,
      email,
      phone: phone || null,
      display_name: displayName,
      message,
      expires_at: expiresAt
    })
    .select()
    .single();

  // Mark numbers as held and link them to this specific hold
  const { data: updatedNumbers, error: updateError } = await supabase
    .from('numbers')
    .update({
      status: 'held',
      hold_expires_at: expiresAt,
      hold_id: hold.id
    })
    .in('number', numbers)
    .eq('board_id', boardId)
    .eq('status', 'available')
    .select();

  if (updateError) {
    console.error('Error updating numbers to held:', updateError);
    // Clean up the hold record
    await supabase.from('holds').delete().eq('id', hold.id);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to reserve your numbers. Please try again.' })
    };
  }

  // Race condition check: if fewer numbers updated than requested, some were just taken
  if (!updatedNumbers || updatedNumbers.length < numbers.length) {
    // Clean up partial hold
    await supabase.from('numbers').update({ status: 'available', hold_expires_at: null, hold_id: null })
      .in('number', (updatedNumbers || []).map(n => n.number)).eq('board_id', boardId);
    await supabase.from('holds').delete().eq('id', hold.id);
    return {
      statusCode: 409,
      body: JSON.stringify({ error: 'One or more numbers were just taken. Please select different numbers.' })
    };
  }

  console.log(`\u2705 Marked ${updatedNumbers.length} numbers as held`);
  console.log('Numbers:', numbers);
  console.log('Board ID:', boardId);

  return {
    statusCode: 200,
    body: JSON.stringify({ holdId: hold.id, numbersHeld: updatedNumbers.length })
  };
}
