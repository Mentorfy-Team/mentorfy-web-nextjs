import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';

export const LoadUserProfile = async (ctx) => {
  const supabase = await supabaseServerClient(ctx);
  const { user, token } = await SupabaseWithouAuth.auth.api.getUserByCookie(
    ctx.req,
  );

  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
};
