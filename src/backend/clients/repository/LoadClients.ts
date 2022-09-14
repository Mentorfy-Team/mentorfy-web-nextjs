import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';

export const LoadClients = async (ctx) => {
  const supabase = await supabaseServerClient(ctx);
  const { user } = await SupabaseWithouAuth.auth.api.getUserByCookie(ctx.req);

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', user.id)
    .single();

  return clients;
};
