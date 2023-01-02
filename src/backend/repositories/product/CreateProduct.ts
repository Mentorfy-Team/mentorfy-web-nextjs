import { SupabaseClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { Database } from '~/@types/supabase/v2.types';

export const CreateProduct = async (
  supabase: SupabaseClient<Database>,
  data: {
    product: any;
    user: any;
  },
) => {
  // ? If its a clone, we need to remove the unecessary data
  delete data.product?.created_at;
  delete data.product?.id;
  delete data.product?.member_area;
  delete data.product?.status;
  delete data.product?.parent;

  const { error, data: newProduct } = await supabase
    .from('product')
    .insert({
      ...data.product,
      title: data.product.title,
      owner: data.user.id,
      refeerer: nanoid(6),
    })
    .select()
    .single();

  const { error: errorm, data: memberArea } = await supabase
    .from('member_area')
    .insert({
      id: newProduct.id,
      type_id: parseInt(newProduct.deliver),
    })
    .select()
    .single();

  const { data: updatedProduct, error: merror } = await supabase
    .from('product')
    .update({
      member_area: memberArea.id,
    })
    .eq('id', newProduct.id)
    .select('*')
    .single();

  return updatedProduct;
};
