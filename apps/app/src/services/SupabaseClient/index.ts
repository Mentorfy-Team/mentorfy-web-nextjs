//import { createClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

const SupabaseClient = () => {
  return createBrowserSupabaseClient();
};

export default SupabaseClient;
