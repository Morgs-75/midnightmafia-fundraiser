import { createClient } from '@supabase/supabase-js';

// ⚠️ REPLACE THESE WITH YOUR ACTUAL VALUES
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Board ID - get this from your Supabase boards table
export const BOARD_ID = import.meta.env.VITE_BOARD_ID || 'YOUR_BOARD_ID_HERE';
