//import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';
import { UpdateExpiration } from '~/backend/repositories/subscription/UpdateExpiration';

export const PagarmeRoute = async (req: NextApiRequest, supabase: any) => {
  const { data, account } =
    req.body as Webhook.Integration.Pagarme.PagarmeResponse;

  if (data.status === 'paid') {
    if (data.customer.email && account.id) {
      const email = data.customer.email;
      const name = data.customer.name;
      let phone = null;
      if (data.customer.phones?.mobile_phone) {
        const {
          mobile_phone: { area_code, country_code, number },
        } = data.customer.phones;
        phone = `${country_code}${area_code}${number}`;
      }
      //const phone_numbers =

      const user = await InviteAndSubscribe({
        supabase,
        data: {
          email: email,
          name: name,
          phone: phone,
          refeerer: req.query.id as string,
          customer_id: data.customer.id,
          plan_id: data.items[0].description,
        },
      });

      await UpdateExpiration({
        supabase,
        data: {
          user: user,
          days: 30,
        },
      });
    }
  }
  // Processa o pedido

  return true;
};
