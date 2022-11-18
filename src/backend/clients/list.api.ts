import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseWithAuth(req);

  const { data: products } = await supabase
    .from('product')
    .select('id, title')
    .eq('owner', req.query.id);

  const { data: relations } = await supabase
    .from('client_product')
    .select('*')
    .in(
      'product_id',
      products.map((product) => product.id),
    );

  const { data: users } = await supabase
    .from('profile')
    .select('id, name, email, phone')
    .in(
      'id',
      relations.map((relation) => relation.user_id),
    );

  const { count: views, error } = await supabase
    .from('profile_history')
    .select('*', { count: 'exact' })
    .in(
      'profile_id',
      relations.map((relation) => relation.user_id),
    )
    .eq('code', 100);

  const clients = users.map((user) => {
    const relation = relations.filter(
      (relation) => relation.user_id === user.id,
    );
    const products_relation = products
      .filter((product) => relation.find((r) => r.product_id === product.id))
      .map((product) => ({
        ...product,
        subscribed_at: relation.find((r) => r.product_id === product.id)
          .created_at,
      }));
    return {
      ...user,
      products: products_relation,
    };
  });

  // TODO: Adicionar log de erros detalhados
  res.status(200).json({
    clients,
    statistics: { totalClients: clients.length, totalAccesses: views },
  });
};
