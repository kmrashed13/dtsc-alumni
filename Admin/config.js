/* =====================================
   DTSC ALUMNI ASSOCIATION
   SUPABASE CONFIGURATION
===================================== */

const SUPABASE_URL = "https://fhgmjrtgxdudpzaonlhv.supabase.co";

const SUPABASE_ANON_KEY = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sEvhoc3qt1HmMdwaYPzbuQ_zWzU0dKv";

/* Initialize Supabase */

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
