import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    mentors: string[];
    clients: string[];
    teams: string[];
    role: string;
  };
};

export const AssignClients = async ({
  supabase,
  data: { clients, mentors, role },
}: Props) => {
  const toUpsert: {
    id?: number;
    profile_id: string;
    team_member_id: string;
    role: string;
  }[] = [];
  for (const client of clients) {
    for (const mentor of mentors) {
      toUpsert.push({
        team_member_id: mentor,
        profile_id: client,
        role,
      });
    }
  }

  const { data, error } = await supabase
    .from('team_member_client')
    .select('*')
    .in('team_member_id', mentors || [])
    .in('profile_id', clients || []);

  // update existing in toUpsert
  for (const row of data) {
    const index = toUpsert.findIndex(
      (item) =>
        item.profile_id == row.profile_id &&
        item.team_member_id == row.team_member_id,
    );
    if (index !== -1) {
      toUpsert[index].id = row.id;
    }
  }

  await supabase.from('team_member_client').upsert(toUpsert);
};

export default AssignClients;
