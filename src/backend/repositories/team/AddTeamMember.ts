import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    team_id: string;
    user: {
      id: string;
    };
  };
};

export const AddTeamMember = async ({
  supabase,
  data: {
    team_id,
    user: { id },
  },
}: Props) => {
  const { data: team_member } = await supabase
    .from('team_member')
    .insert({
      team_id: team_id,
      profile_id: id,
    })
    .select('*');

  return team_member;
};
