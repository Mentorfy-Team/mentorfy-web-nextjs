import { CheckForAccount } from '~/backend/repositories/auth/CheckForAccount';
import { CreateAccount } from '~/backend/repositories/auth/CreateAccount';
import { AddTeamMember } from '~/backend/repositories/team/AddTeamMember';
import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('id', req.query.id);

  const { data: teams } = await supabase
    .from('team_member')
    .select('*')
    .eq('profile_id', req.query.id);

  const { data: clients } = await supabase
    .from('team_member_client')
    .select('*')
    .eq('mentor_id', req.query.id);

  res.status(200).json({ ...profile, teams, clients });
};

export const post = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  try {
    let userAccount = await CheckForAccount({
      supabase,
      data: req.body,
    });

    if (!userAccount) {
      userAccount = await CreateAccount({
        supabase,
        data: req.body,
      });
    }

    const team_member = await AddTeamMember({
      supabase,
      data: {
        teams: req.body.teams,
        user: userAccount,
      },
    });

    res.status(200).json({ user: { ...userAccount, teams: team_member } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const del = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401);
  }

  // has permission to delete
  const { data: teams } = await supabase
    .from('team')
    .select('*, team_member(*)')
    .in(
      'id',
      req.body.teams.map((team) => team.id),
    );

  if (
    teams.every((t) => t.owner_id !== user.id) ||
    teams.every((t) =>
      (t.team_member as any[]).every(
        (m) => m.profile_id !== req.body.profile_id,
      ),
    )
  ) {
    return res.status(401);
  }

  const { data: team_member } = await supabase
    .from('team')
    .select('*')
    .in('profile_id', req.body.profile_id);

  await supabase
    .from('team_member')
    .delete()
    .in(
      'id',
      team_member.map((t) => t.id),
    );

  // TODO: Log the reason for the deletion

  res.status(200).json({});
};
