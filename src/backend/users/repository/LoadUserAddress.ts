import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';

export const LoadUserAddress = async (ctx) => {
    const supabase = await supabaseServerClient(ctx);
    const { user, token } = await supabase.auth.api.getUserByCookie(ctx.req);

    const { data: address, error } = await supabase
    .from('address')
    .select('*')
    .eq('address', user.id)
    .single();

    return address;
};
