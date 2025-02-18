//
const { createClient } = supabase;

// Initialize Supabase client with environment variables
window.supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);