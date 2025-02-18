const supabaseUrl = window._env_.SUPABASE_URL;
const supabaseKey = window._env_.SUPABASE_ANON_KEY;

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);