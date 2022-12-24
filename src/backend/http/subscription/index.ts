import { CreateSubscription } from '~/backend/repositories/pagarme/subscription/CreateSubscription';
import { DeleteSubscription } from '~/backend/repositories/pagarme/subscription/DeleteSubscription';
import { EditSubscription } from '~/backend/repositories/pagarme/subscription/EditSubscription';
import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // const { data: teams } = await supabase
  //   .from('team')
  //   .select('*')
  //   .eq('owner_id', user.id);

  res.status(200).json({});
};

export const patch = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const body = req.body;

  if (!body.subscription_id || !body.data.card) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const sub = await EditSubscription(body.subscription_id, body.data.card);

  await supabase
    .from('profile')
    .update({
      card_id: sub.card.id,
    })
    .eq('id', user.id);

  res.status(200).json({});
};

export const post = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const body: Pagarme.Subscription.Request = req.body;

  const {
    data: { expiration_date },
  } = await supabase
    .from('profile')
    .select('expiration_date')
    .eq('id', user.id)
    .single();

  const response = await CreateSubscription({
    ...body,
    start_at: expiration_date,
  });

  await supabase
    .from('profile')
    .update({
      subscription_id: response.id,
      card_id: body.card_id,
    })
    .eq('id', user.id);

  res.status(200).json({});
};

export const del = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !req.body.subscription_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await DeleteSubscription(req.body.subscription_id);

  await supabase
    .from('profile')
    .update({
      subscription_id: null,
      card_id: null,
    })
    .eq('id', user.id);

  res.status(200).json({});
};
