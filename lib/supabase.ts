import { createClient } from "@supabase/supabase-js";

// These environment variables are read ONLY on the server (in Server Components)
// They're prefixed with NEXT_PUBLIC_ so the browser can also read the anon key safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
