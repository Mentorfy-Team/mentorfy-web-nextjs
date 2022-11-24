import {
  Session,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';

export const GetAuthSession = async (ctx): Promise<{ session: Session }> => {
  const supabase = createServerSupabaseClient(ctx);

  try {
    const {
      data: { session },
    } = await supabase.auth.setSession({
      access_token: ctx.req.cookies['sb-access-token'],
      refresh_token: ctx.req.cookies['sb-refresh-token'],
    });
    return { session };
  } catch (error) {
    return (error as any).message;
  }
};
