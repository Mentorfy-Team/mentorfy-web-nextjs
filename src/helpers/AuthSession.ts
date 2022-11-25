import {
  Session,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';

export const GetAuthSession = async (ctx): Promise<{ session: Session }> => {
  const supabase = createServerSupabaseClient(ctx);

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return { session };
  } catch (error) {
    return (error as any).message;
  }
};
