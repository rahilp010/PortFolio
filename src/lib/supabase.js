import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const isValidSupabaseUrl = (() => {
   if (!url) return false;
   try {
      const parsedUrl = new URL(url);
      return (
         (parsedUrl.protocol === 'https:' &&
            parsedUrl.hostname !== 'your-project.supabase.co') ||
         (parsedUrl.protocol === 'http:' && parsedUrl.hostname === 'localhost')
      );
   } catch {
      return false;
   }
})();

export const isSupabaseConfigured = Boolean(
   isValidSupabaseUrl &&
      anonKey &&
      anonKey !== 'your-supabase-publishable-or-anon-key',
);
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
