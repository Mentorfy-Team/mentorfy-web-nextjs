import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

export const GetTokenByRefeerer = async (
  supabase: SupabaseClient<Database>,
  refeerer: string,
  type: string,
) => {
  const { data: product, error } = await supabase
    .from('product')
    .select('integration_token(*)')
    .eq('refeerer', refeerer)
    .eq('integration_token.type', type)
    .single();

  return product?.integration_token[0] as Webhook.Token;
};
