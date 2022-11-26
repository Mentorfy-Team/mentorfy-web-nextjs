import { AddTeamMember } from '~/backend/repositories/team/AddTeamMember';
import { InviteAndCreateAccount } from '~/backend/repositories/auth/InviteAndCreateAccount';
import { SupabaseAdmin, SupabaseServer } from '~/backend/supabase';
import { CheckForAccount } from '~/backend/repositories/auth/CheckForAccount';
import { DeleteTeamMember } from '~/backend/repositories/auth/DeleteTeamMember';

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

export const post = async (req, res) => {
  const supabase = SupabaseAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  let userAccount = await CheckForAccount({
    supabase,
    data: req.body,
  });

  if (!userAccount) {
    userAccount = await InviteAndCreateAccount({
      supabase,
      data: {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
      },
    });
  }

  await AddTeamMember({
    supabase,
    data: {
      team_id: req.body.team_id,
      user: userAccount,
    },
  });

  res.status(200).json({ user: userAccount });
};

export const del = async (req, res) => {
  const supabase = SupabaseAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  await DeleteTeamMember({
    supabase,
    data: {
      team_member_id: req.body.team_member_id,
    },
  });
};
