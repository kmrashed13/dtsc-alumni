const SUPABASE_URL = "https://fhgmjrtgxdudpzaonlhv.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_fnFoN8ecsee3fvi1FPYXRA_HiQj5qg8";

if (!window.supabase) {
  console.error("Supabase library failed to load.");
} else {
  const { createClient } = window.supabase;

  window.supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  console.log("Supabase client initialized.");
}
