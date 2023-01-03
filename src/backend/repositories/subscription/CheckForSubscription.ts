import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';
//import { dateToReadable } from '~/backend/http/clients/list.api';

type AccessType = {
  type: 'team' | 'client' | 'mentor';
  team?: {
    team_id: string;
  };
  client?: {
    product_id: string;
  };
  mentor?: {
    plan: 'trial' | string;
  };
  expiration_date?: string;
};

export const CheckForSubscription = async ({
  supabase,
  data: { user_id },
}: {
  supabase: SupabaseClient<Database>;
  data: {
    user_id: string;
  };
}) => {
  const { data: user, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user_id)
    .single();

  const AccessTypes: AccessType[] = [];

  if (user) {
    if (user.plan_id) {
      AccessTypes.push({
        type: 'mentor',
        mentor: {
          plan: user.plan_id,
        },
        expiration_date: user.expiration_date,
      });
    }

    const { data: team_members, error } = await supabase
      .from('team_member')
      .select('*, team(*)')
      .eq('profile_id', user_id);

    if (team_members) {
      team_members
        .map((team_member) => {
          return team_member.team as TeamTypes.Team;
        })
        .forEach(async (team) => {
          const { data: owner, error } = await supabase
            .from('profile')
            .select('expiration_date')
            .eq('id', team.owner_id)
            .single();

          AccessTypes.push({
            type: 'team',
            team: {
              team_id: team.id,
            },
            expiration_date: owner.expiration_date,
          });
        });
    }
  } else {
    return null;
  }
  // const currentSub = new Date(user.expiration_date);
  // const isSubActive = currentSub.toISOString() > new Date().toISOString();

  // const subExpiration = new Date();
  // if (isSubActive) {
  //   // find the remaining days and add them to the new expiration date
  //   const remainingDays = Math.floor(
  //     (currentSub.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  //   );
  //   subExpiration.setDate(subExpiration.getDate() + remainingDays);

  //   // add 30 days to the new expiration date
  //   subExpiration.setDate(subExpiration.getDate() + days);
  // }

  // const { data: profile, error } = await supabase
  //   .from('profile')
  //   .update({
  //     expiration_date: dateToReadable(subExpiration),
  //   })
  //   .eq('id', user.id);

  //return profile;
};
