const supabaseUrl = window.SUPABASE_URL;
const supabaseKey = window.SUPABASE_ANON_KEY;

window.supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);