import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';
import { CheckForAccount } from './CheckForAccount';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    email: string;
    name: string;
    phone: string;
    refeerer: string;
  };
};

export const InviteAndGiveProduct = async ({
  supabase,
  data: { email, name, phone, refeerer },
}: Props) => {
  let user;

  const existentUser = CheckForAccount({
    supabase,
    data: {
      email,
    },
  });

  if (!existentUser) {
    const { data, error: ierror } = await supabase.auth.admin.inviteUserByEmail(
      email,
      {
        data: {
          name,
          phone,
        },
        redirectTo: process.env.NEXT_PUBLIC_APP_URL,
      },
    );
    user = data.user;
  } else {
    user = existentUser;
  }

  await supabase.auth.admin.updateUserById(user.id, { phone });

  await supabase
    .from('profile')
    .update({ name, email: email, phone: phone })
    .eq('id', user.id);

  const { data } = await supabase
    .from('product')
    .select('id')
    .eq('refeerer', refeerer)
    .single();

  await supabase.from('client_product').insert({
    user_id: user.id,
    product_id: data.id,
  });

  return user;
};
