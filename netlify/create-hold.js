import { createClient } from '@supabase/supabase-js';

export async function handler(event) {
  const { numbers, displayName, email, phone, message, boardId } = JSON.parse(event.body);

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
    return { statusCode: 409, body: 'One or more numbers unavailable' };
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

  // Mark numbers as held
  await supabase
    .from('numbers')
    .update({ status: 'held', hold_expires_at: expiresAt })
    .in('number', numbers)
    .eq('board_id', boardId);

  return {
    statusCode: 200,
    body: JSON.stringify({ holdId: hold.id })
  };
}
