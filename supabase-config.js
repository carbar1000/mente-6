//
const { createClient } = supabase;

// Initialize Supabase client with environment variables
window.supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

// This file will be minimal since we're using API endpoints
const initSupabase = () => {
    console.log('Using secure API endpoint for Supabase operations');
};

window.initSupabase = initSupabase;