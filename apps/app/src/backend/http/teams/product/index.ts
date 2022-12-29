import { SupabaseServer } from '@app/backend/supabase';

export const put = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data: teams } = await supabase
    .from('team')
    .update({
      products: req.body.products,
    })
    .eq('owner_id', user.id)
    .eq('id', req.body.team_id)
    .select('*');

  res.status(200).json(teams);
};
