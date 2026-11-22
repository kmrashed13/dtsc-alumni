const SUPABASE_URL = "https://fhgmjrtgxdudpzaonlhv.supabase.co";

// Supabase Dashboard থেকে Publishable Key বসাও
const SUPABASE_ANON_KEY = "sb_publishable_fnFoN8ecsee3fvi1FPYXRA_HiQj5qg8";

if (!window.supabase) {
  console.error("Supabase library not loaded.");
} else {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  console.log("Supabase client initialized.");
}
