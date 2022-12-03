import { SupabaseServer } from '~/backend/supabase';
import { HasTeamPermission } from '~/backend/repositories/team/HasTeamPermission';
import { DeleteClientMentor } from '~/backend/repositories/team/DeleteClientToMentor';
import AssignClients from '~/backend/repositories/team/AssignClients';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data: team_members } = await supabase
    .from('team_member')
    .select('*, profile(*), team(*)')
    .eq('profile_id', req.query.id);

  res.status(200).json(team_members);
};

export const post = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (
    !req.body.team_members ||
    !req.body.clients ||
    !req.body.teams ||
    !req.body.role
  ) {
    return res.status(400).json({ error: 'Missing data' });
  }

  await AssignClients({
    supabase,
    data: {
      mentors: req.body.team_members,
      clients: req.body.clients,
      teams: req.body.teams,
      role: req.body.role,
    },
  });

  res.status(200).json({});
};

export const del = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (
    !HasTeamPermission({
      supabase,
      data: {
        mentor_id: req.body.team_member_id,
        client_id: req.body.client_id,
        role: 'Tutor',
      },
    })
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await DeleteClientMentor({
    supabase,
    data: {
      team_member_client_id: req.body.team_member_client_id,
    },
  });
};
