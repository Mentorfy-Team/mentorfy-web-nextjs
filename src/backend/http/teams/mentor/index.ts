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

  // const { data: profile } = await supabase
  //   .from('profile')
  //   .select('*')
  //   .eq('id', req.query.id);

  // const { data: teams } = await supabase
  //   .from('team_member')
  //   .select('*')
  //   .eq('profile_id', req.query.id);

  // const { data: clients } = await supabase
  //   .from('team_member_client')
  //   .select('*')
  //   .eq('mentor_id', req.query.id);

  // res.status(200).json({ ...profile, teams, clients });

  res.status(200).json({ user });
};
