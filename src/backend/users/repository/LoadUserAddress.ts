import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';

export const LoadUserAddress = async (ctx) => {
  const supabase = await supabaseServerClient(ctx);
  const { user, token } = await SupabaseWithouAuth.auth.api.getUserByCookie(
    ctx.req,
  );

  const { data: address, error } = await supabase
    .from('address')
    .select('*')
    .eq('id', user.id)
    .single();

  return address;
};
