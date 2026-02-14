import { createClient } from "@supabase/supabase-js";

function pickRandomUnique(arr, count) {
  const copy = [...arr];
  const out = [];
  while (out.length < count && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

export async function handler(event) {
  // Simple admin gate (MVP)
  const auth = event.headers["authorization"] || "";
  const expected = `Bearer ${process.env.ADMIN_TOKEN}`;
  if (!process.env.ADMIN_TOKEN || auth !== expected) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const { boardId, winnersCount = 1, drawLabel = "Draw" } = JSON.parse(event.body || "{}");
  if (!boardId) return { statusCode: 400, body: "Missing boardId" };

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Get sold numbers for board
  const { data: sold, error } = await supabase
    .from("numbers")
    .select("number, display_name, message")
    .eq("board_id", boardId)
    .eq("status", "sold");

  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  if (!sold || sold.length === 0) return { statusCode: 409, body: "No sold numbers" };

  const winners = pickRandomUnique(sold, Math.max(1, Math.min(winnersCount, sold.length)))
    .map((w, idx) => ({
      place: idx + 1,
      number: w.number,
      displayName: w.display_name || "",
      message: w.message || ""
    }));

  // Store draw record (create table if you haven’t yet)
  // If you didn’t create draws table, do so (recommended).
  const { data: drawRow, error: drawErr } = await supabase
    .from("draws")
    .insert({
      board_id: boardId,
      draw_number: Date.now(),      // simple unique value for MVP
      winners,
      published_at: new Date().toISOString()
    })
    .select()
    .single();

  if (drawErr) {
    return { statusCode: 500, body: JSON.stringify({ error: drawErr.message }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      label: drawLabel,
      winners,
      publishedAt: drawRow.published_at
    })
  };
}
