import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  const { data: teams } = await supabase
    .from('team')
    .select('*')
    .eq('owner', user.id);

  const { data: team_members } = await supabase
    .from('team_member')
    .select('*, profile(*)')
    .in(
      'team_id',
      teams.map((team) => team.id),
    );

  res.status(200).json({ teams, team_members });
};
