import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

export const GetAllProducts = async (
  supabase: SupabaseClient<Database>,
  data?: {
    id?: string;
  },
) => {
  if (!!data?.id && data?.id !== 'undefined' && data?.id !== 'null') {
    const { data: team_member, error: tmError } = await supabase
      .from('team_member')
      .select('*, team(*)')
      .eq('profile_id', data?.id);

    const teamProducts = team_member.reduce((acc, team) => {
      return [...acc, ...(team.team as TeamTypes.Team).products];
    }, []);

    const { data: products, error } = await supabase
      .from('product')
      .select('*, member_area(*, member_area_type(*))')
      .or('id.in.(' + teamProducts.join(',') + '), owner.eq.' + data?.id);

    const { data: relations } = await supabase
      .from('client_product')
      .select('*')
      .in('product_id', products?.map((p) => p.id) || []);

    const productRelations = products.map((p) => {
      const productRelations = relations.filter((r) => r.product_id === p.id);
      return {
        ...p,
        relations: productRelations,
      };
    });

    return productRelations;
  }

  const { data: products, error } = await supabase
    .from('product')
    .select('*, member_area(*, member_area_type(*))');

  return products;
};
