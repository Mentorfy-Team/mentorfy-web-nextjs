import { SupabaseAdmin, SupabaseServer } from '~/backend/supabase';
import { AddClientMentor } from '~/backend/repositories/team/AddClientToMentor';
import { HasTeamPermission } from '~/backend/repositories/team/HasTeamPermission';
import { DeleteClientMentor } from '~/backend/repositories/team/DeleteClientToMentor';

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
    .select('*, profile(*), team(*)')
    .eq('profile_id', req.query.id);

  res.status(200).json(team_members);
};

export const post = async (req, res) => {
  const supabase = SupabaseAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  await AddClientMentor({
    supabase,
    data: {
      mentor_id: req.body.mentor_id,
      profile_id: req.body.profile_id,
      role: req.body.role,
    },
  });

  res.status(200).json({});
};

export const del = async (req, res) => {
  const supabase = SupabaseAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  if (
    !HasTeamPermission({
      supabase,
      data: {
        mentor_id: req.body.mentor_id,
        client_id: req.body.profile_id,
        role: 'Tutor',
      },
    })
  ) {
    return res.status(401);
  }

  await DeleteClientMentor({
    supabase,
    data: {
      team_member_client_id: req.body.id,
    },
  });
};
