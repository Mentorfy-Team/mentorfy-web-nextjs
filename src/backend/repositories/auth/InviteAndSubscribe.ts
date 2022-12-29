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
    refeerer: string | string[];
    customer_id: string;
    card_id?: string;
    plan_id?: string;
    subscription_id?: string;
    address?: Pagarme.Address;
  };
};

export const InviteAndSubscribe = async ({
  supabase,
  data: {
    email,
    name,
    phone,
    refeerer,
    customer_id,
    card_id,
    plan_id,
    subscription_id,
    address,
  },
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
      })
      .eq('id', user.id);
  }

  // current data + 30 days
  const expiration_date = new Date();
  expiration_date.setDate(expiration_date.getDate() + 30);

  let toUpdate;

  if (address) {
    // find number from address
    const number = address.line_2?.match(/\d+/g)?.[0];

    await supabase
      .from('address')
      .upsert({
        id: user.id,
        zipcode: address.zip_code,
        street: address.line_1,
        number: number ? parseInt(number) : null,
        neighborhood: address.line_2,
        city: address.city,
        state: address.state,
      })
      .eq('id', user.id);
  }

  if (refeerer) {
    toUpdate = {
      access_type: 'mentorado',
    };
  } else {
    toUpdate = {
      interval: 'monthly',
      active: true,
      expiration_date: dateToReadable(expiration_date),
      plan: 'pro',
      access_type: 'mentor',
      customer_id: customer_id,
      card_id: card_id,
      plan_id: plan_id,
      subscription_id: subscription_id,
    };
  }

  await supabase.from('profile').update(toUpdate).eq('id', user.id);

  return user;
};
