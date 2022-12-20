import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';
import { dateToReadable } from '~/backend/http/clients/list.api';
import { CheckForAccount } from './CheckForAccount';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    email: string;
    name: string;
    phone: string;
    refeerer: string;
    customer_id: string;
    card_id?: string;
  };
};

export const InviteAndSubscribe = async ({
  supabase,
  data: { email, name, phone, refeerer, customer_id, card_id },
}: Props) => {
  let user = await CheckForAccount({
    supabase,
    data: {
      email,
    },
  });

  if (!user) {
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
    user = data.user as any;

    try {
      await supabase.auth.admin.updateUserById(user.id, { phone });
    } finally {
      // inform user that the phone number was already used
    }

    await supabase
      .from('profile')
      .update({
        name,
        email: email,
        phone: phone,
        customer_id: customer_id,
        card_id: card_id,
      })
      .eq('id', user.id);
  }

  // current data + 30 days
  const expiration_date = new Date();
  expiration_date.setDate(expiration_date.getDate() + 30);

  let toUpdate;

  if (refeerer) {
    toUpdate = {
      access_type: 'mentorado',
    };
  } else {
    toUpdate = {
      interval: 'monthly',
      is_subscribed: true,
      expiration_date: dateToReadable(expiration_date),
      plan: 'pro',
      access_type: 'mentor',
    };
  }

  await supabase.from('profile').update(toUpdate).eq('id', user.id);

  return user;
};
