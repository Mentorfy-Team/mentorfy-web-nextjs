import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@app/@types/supabase/v2.types';

export const GetProfileById = async (
  supabase: SupabaseClient<Database>,
  data: {
    id: string;
    withAddress?: boolean;
  },
) => {
  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', data.id)
    .single();

  let address = null;
  if (data.withAddress) {
    const { data: profile_address } = await supabase
      .from('address')
      .select('*')
      .eq('id', data.id)
      .single();
    address = profile_address;
  }

  return { profile, address };
};
