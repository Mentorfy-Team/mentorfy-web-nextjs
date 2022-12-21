import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    email: string;
  };
};

export const CheckForAccount = async ({ supabase, data: { email } }: Props) => {
  const { data: user } = await supabase
    .from('profile')
    .select('*')
    .eq('email', email)
    .single();

  return user;
};
