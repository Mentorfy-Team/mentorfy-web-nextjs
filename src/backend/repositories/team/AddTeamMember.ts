import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    teams: string[];
    user: {
      id: string;
    };
  };
};

export const AddTeamMember = async ({
  supabase,
  data: {
    teams,
    user: { id },
  },
}: Props) => {
  const team_member = [];

  for (const team of teams) {
    const { data, error } = await supabase
      .from('team_member')
      .insert([
        {
          profile_id: id,
          team_id: team,
        },
      ])
      .select('*')
      .single();

    if (error) {
      // console.log(error);
    }
    team_member.push(data);
  }

  return team_member;
};
