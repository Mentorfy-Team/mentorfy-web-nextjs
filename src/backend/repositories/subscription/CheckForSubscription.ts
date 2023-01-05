import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';
//import { dateToReadable } from '~/backend/http/clients/list.api';

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

  const AccessTypes: UserTypes.AccessType[] = [];

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

    const pids = team_members
      .reduce((acc, tm) => {
        return acc.concat((tm.team as any).products);
      }, [])
      .map((x) => x);

    const { data: products } = await supabase
      .from('product')
      .select('id, title')
      .in('id', pids);

    if (team_members) {
      const reduced = team_members.reduce(
        (acc: TeamTypes.Team[], teamMember) => {
          const team = teamMember.team as TeamTypes.Team;
          team.products = products.filter((p) =>
            team.products.includes(p.id),
          ) as any;
          team['member_id'] = teamMember.id;
          const x = acc.find((y) => y.owner_id === team.owner_id);
          if (!x) {
            return acc.concat([team]);
          } else {
            return acc;
          }
        },
        [],
      );
      for (let i = 0; i < reduced.length; i++) {
        const team = reduced[i];
        const { data: owner, error } = await supabase
          .from('profile')
          .select('expiration_date')
          .eq('id', team.owner_id)
          .single();

        AccessTypes.push({
          type: 'team',
          team: {
            id: team.id,
            owner_id: team.owner_id,
            name: team.title,
            member_id: team['member_id'],
            products: team.products,
          },
          expiration_date: owner.expiration_date,
        });
      }
    }
    return AccessTypes;
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
