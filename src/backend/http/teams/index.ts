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
    .eq('owner_id', user.id);

  const { data: team_members } = await supabase
    .from('team_member')
    .select('*, profile(*), team_member_client(*)')
    .in(
      'team_id',
      teams.map((team) => team.id),
    );

  res.status(200).json({ teams, team_members });
};

export const post = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  const { data: team } = await supabase
    .from('team')
    .insert({
      title: req.body.title,
      owner_id: user.id,
    })
    .single();

  res.status(200).json({ team });
};

export const del = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  await supabase.from('team').delete().eq('id', req.query.id);

  res.status(200);
};
