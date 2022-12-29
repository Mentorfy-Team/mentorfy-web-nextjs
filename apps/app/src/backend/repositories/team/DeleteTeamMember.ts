import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@app/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    team_member_id: string;
  };
};

export const DeleteTeamMember = async ({
  supabase,
  data: { team_member_id },
}: Props) => {
  await supabase
    .from('team_member_client')
    .delete()
    .eq('team_member_id', team_member_id);

  await supabase.from('team_member').delete().eq('id', team_member_id);
};
