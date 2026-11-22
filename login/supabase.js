const SUPABASE_URL = "https://fhgmjrtgxdudpzaonlhv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sEvhoc3qt1HmMdwaYPzbuQ_zWzU0dKv";

const { createClient } = supabase;

window.supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
