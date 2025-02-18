//
const { createClient } = supabase;
window.supabase = createClient(
    'https://your-project-url.supabase.co',  // Será substituído pelo Vercel
    'your-anon-key'  // Será substituído pelo Vercel
);