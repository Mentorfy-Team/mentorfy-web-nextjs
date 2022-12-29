import { SupabaseServer } from '@app/backend/supabase';

export const dateToReadable = (dateObj) => {
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
};

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = SupabaseServer(req, res);
  const approved = req.query.approved ?? true;

  const { data: products } = await supabase
    .from('product')
    .select('id, title')
    .eq('owner', req.query.id);

  const { data: relations, error: relErr } = await supabase
    .from('client_product')
    .select('*')
    .in('product_id', products?.map((product) => product.id) || [])
    .eq('approved', approved);

  const { data: users } = await supabase
    .from('profile')
    .select('id, name, email, phone')
    .in('id', relations?.map((relation) => relation.user_id) || []);

  const { count: views, error } = await supabase
    .from('profile_history')
    .select('*', { count: 'exact' })
    .in('profile_id', relations?.map((relation) => relation.user_id) || [])
    .eq('code', 100);

  const { data: team_Member_Client, error: tmcError } = await supabase
    .from('team_member_client')
    .select('*, team_member(*)')
    .in('profile_id', users?.map((user) => user.id) || []);

  const { data: profile_history, error: phError } = await supabase
    .from('profile_history')
    .select('id, profile_id')
    .in('profile_id', users?.map((user) => user.id) || [])
    // greater than 1 month ago
    .gte(
      'created_at',
      dateToReadable(new Date(new Date().setMonth(new Date().getMonth() - 1))),
    );

  const clients = users?.map((user) => {
    const relation = relations.filter(
      (relation) => relation.user_id === user.id,
    );
    const products_relation = products
      ?.filter((product) => relation.find((r) => r.product_id === product.id))
      ?.map((product) => ({
        ...product,
        subscribed_at: relation.find((r) => r.product_id === product.id)
          .created_at,
      }));
    return {
      ...user,
      mentors: team_Member_Client.filter((tmc) => tmc.profile_id === user.id),
      products: products_relation,
      hasActivety: profile_history.some((ph) => ph.profile_id === user.id),
    };
  });

  // TODO: Adicionar log de erros detalhados
  res.status(200).json({
    clients: clients.filter(
      (client) =>
        !req.query.relationRef ||
        client.mentors.some(
          (mentor) =>
            req.query.relationRef === (mentor.team_member as any).profile_id,
        ),
    ),
    statistics: { totalClients: clients.length, totalAccesses: views },
  });
};
