import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

export const GetProductById = async (
  supabase: SupabaseClient<Database>,
  data: {
    id: string;
  },
) => {
  const { data: product, error } = await supabase
    .from('product')
    .select('*, member_area(*, member_area_type(*)), profile(id, name)')
    .eq('id', data.id)
    .single();

  return product;
};
