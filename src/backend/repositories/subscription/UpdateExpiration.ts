import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';
import { dateToReadable } from '~/backend/http/clients/list.api';

export const UpdateExpiration = async ({
  supabase,
  data: { user, days = 30 },
}: {
  supabase: SupabaseClient<Database>;
  data: {
    user: UserTypes.Profile;
    days: number;
  };
}) => {
  const currentSub = new Date(user.expiration_date);
  const isSubActive = currentSub.toISOString() > new Date().toISOString();

  const subExpiration = new Date();
  if (isSubActive) {
    // find the remaining days and add them to the new expiration date
    const remainingDays = Math.floor(
      (currentSub.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
    );
    subExpiration.setDate(subExpiration.getDate() + remainingDays);

    // add 30 days to the new expiration date
    subExpiration.setDate(subExpiration.getDate() + days);
  }

  const { data: profile, error } = await supabase
    .from('profile')
    .update({
      expiration_date: dateToReadable(subExpiration),
    })
    .eq('id', user.id);

  return profile;
};
