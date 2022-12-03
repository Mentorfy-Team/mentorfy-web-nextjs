import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    mentor_id: string;
    profile_id: string;
    role: string;
  };
};

export const AddClientMentor = async ({
  supabase,
  data: { mentor_id, profile_id, role },
}: Props) => {
  const { data: team_member } = await supabase
    .from('team_member_client')
    .insert({
      team_member_id: mentor_id,
      profile_id: profile_id,
      role: role,
    })
    .select('*');

  return team_member;
};
