import { CloneTools } from '~/backend/repositories/product/CloneTools';
import { CreateProduct } from '~/backend/repositories/product/CreateProduct';
import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: product, error } = await supabase
    .from('product')
    .select('*')
    .eq('member_area', req.query.product_id)
    .single();

  if (error) {
    return res.status(400).json({
      error: 'Não foi possível clonar o seu produtos.',
    });
  }

  const new_product = await CreateProduct(supabase, {
    product: {
      ...product,
      title: req.query.title,
    },
    user,
  });

  await CloneTools(supabase, {
    refProduct: product,
    newProduct: new_product,
  });

  return res.status(200).json(new_product);
};
