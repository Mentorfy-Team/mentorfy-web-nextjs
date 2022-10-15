import { CreateSupabaseWithAuth } from '~/backend/supabase';
type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  let listProducts = [];
  const { data: clientProducts } = await supabase
    .from('client_product')
    .select('*, member_area!member_area_id_fkey(*)')
    .eq('owner', req.query.id);

  const { data: productsOwned } = await supabase
    .from('product')
    .select('*, member_area!member_area_id_fkey(*)')
    .eq('owner', req.query.id);
  listProducts = listProducts.concat(productsOwned);

  if (clientProducts) {
    const { data: products } = await supabase
      .from('product')
      .select('*, member_area!member_area_id_fkey(*)')
      .in(
        'id',
        clientProducts?.map((product) => product.id),
      );
    listProducts = listProducts.concat(products);
  }

  return res.status(200).json(listProducts);
};
