import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

export const GiveProductToClient = async (
  supabase: SupabaseClient<Database>,
  data: {
    user_id: string;
    refeerer: string;
  },
) => {
  const { data: product } = await supabase
    .from('product')
    .select('id')
    .eq('refeerer', data.refeerer)
    .single();

  await supabase.from('client_product').insert({
    user_id: data.user_id,
    product_id: product.id,
  });

  return true;
};
