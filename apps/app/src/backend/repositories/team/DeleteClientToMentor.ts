import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@app/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    team_member_client_id: string;
  };
};

export const DeleteClientMentor = async ({
  supabase,
  data: { team_member_client_id },
}: Props) => {
  const { data: team_member } = await supabase
    .from('team_member_client')
    .delete()
    .eq('id', team_member_client_id);

  return team_member;
};
