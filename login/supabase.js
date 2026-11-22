const SUPABASE_URL = "https://fhgmjrtgxdudpzaonlhv.supabase.co";

// তোমার বর্তমান Publishable Key এখানে বসাও
const SUPABASE_ANON_KEY = "sb_publishable_sEvhoc3qt1HmMdwaYPzbuQ_zWzU0dKv";

window.supabaseClient = null;

if (!window.supabase) {
  console.error("Supabase library not loaded.");
} else {
  try {
    window.supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );

    console.log("Supabase client initialized successfully.");

  } catch (error) {
    console.error("Supabase initialization failed:", error);
  }
}
