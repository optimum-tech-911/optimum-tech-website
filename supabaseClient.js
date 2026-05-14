import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export a Supabase client if env vars are present; otherwise fallback to null so UI can still render.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: typeof window !== 'undefined',
          persistSession: typeof window !== 'undefined',
          detectSessionInUrl: typeof window !== 'undefined',
          storageKey: 'optimum-tech-auth',
        },
      })
    : null;
