import { SupabaseServer } from '../../../supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);

  const { data: products } = await supabase
    .from('integration_token')
    .select('*')
    .eq('product_id', req.query.id || req.query.refeerer);

  return res.status(200).json(products);
};

export const patch = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const integrations = req.body.list;

  if (!integrations || integrations?.length <= 0) return res.status(400);

  for (let i = 0; i < integrations.length; i++) {
    const integration = integrations[i];

    if (integration.id) {
      await supabase
        .from('integration_token')
        .update({
          product_id: req.body.product_id,
          type: integration.type,
          token: integration.token,
        })
        .eq('id', integration.id);
    } else {
      await supabase.from('integration_token').insert({
        product_id: req.body.product_id,
        type: integration.type,
        token: integration.token,
      });
    }
  }

  return res.status(200).json({});
};
