const supabase = supabaseClient.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

window.supabase = supabase;