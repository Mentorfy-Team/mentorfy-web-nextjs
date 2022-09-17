import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseWithAuth(req);

  const { data, error: productErros } = await supabase
    .from<ProductApi.Product>('product')
    .select('id, title')
    .eq('owner', req.query.id);

  const { data: relations, error: relationsError } = await supabase
    .from('client_product')
    .select('*')
    .in(
      'product_id',
      data.map((product) => product.id),
    );

  const { data: users, error: usersError } = await supabase
    .from('profile')
    .select('id, name, email, phone')
    .in(
      'id',
      relations.map((relation) => relation.user_id),
    );
  const clients = users.map((user) => {
    const relation = relations.filter(
      (relation) => relation.user_id === user.id,
    );
    const products = data
      .filter((product) => relation.find((r) => r.product_id === product.id))
      .map((product) => ({
        ...product,
        subscribed_at: relation.find((r) => r.product_id === product.id)
          .created_at,
      }));
    return {
      ...user,
      products,
    };
  });
  if (productErros || relationsError || usersError) {
    res.status(400).json({
      error: productErros?.message || relationsError?.message || usersError,
    });
  }
  res.status(200).json({ clients });
};
