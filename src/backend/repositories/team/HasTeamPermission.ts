import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    mentor_id: string;
    client_id: string;
    role: string;
  };
};

export const HasTeamPermission = async ({
  supabase,
  data: { mentor_id, client_id, role },
}: Props) => {
  const { data: team_member_client } = await supabase
    .from('team_member_client')
    .select('*, team_member(*)')
    .match({
      team_member_id: mentor_id,
      profile_id: client_id,
    })
    .single();

  const { data: team_member } = await supabase
    .from('team_member')
    .select('*, team(*)')
    .eq('id', team_member_client.team_member_id)
    .single();

  if (team_member.team[0].owner_id === mentor_id) {
    return true;
  }

  if (team_member_client) {
    if (team_member_client.role) {
      return team_member_client.role === role;
    }
  }

  return false;
};
