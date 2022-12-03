import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  const { data: team_members } = await supabase
    .from('team_member')
    .select('*')
    .eq('team_id', req.query.id);

  const { data: clients } = await supabase
    .from('team_member_client')
    .select('*')
    .in(
      'team_member_id',
      (team_members || []).map((team_member) => team_member.id),
    );

  res.status(200).json(clients);
};
