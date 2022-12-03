import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
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
    return res.status(401).json({ error: 'Unauthorized' });
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
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { data } = await supabase
    .from('team_member')
    .select('id')
    .eq('team_id', req.body.team_id);

  await supabase
    .from('team_member_client')
    .delete()
    .in(
      'team_member_id',
      data.map((item) => item.id),
    );
  await supabase
    .from('team_member')
    .delete()
    .in(
      'id',
      data.map((item) => item.id),
    );
  await supabase.from('team').delete().eq('id', req.body.team_id);

  res.status(200).json({});
};
