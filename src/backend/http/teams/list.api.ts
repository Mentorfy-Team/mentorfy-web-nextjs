import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data: teams, error } = await supabase
    .from('team')
    .select('*, team_member(*, profile(*), team_member_client(*, profile(*)))')
    .eq('owner_id', user.id);

  res.status(200).json(teams);
};
