//import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';
import { UpdateExpiration } from '~/backend/repositories/subscription/UpdateExpiration';

export const PagarmeRoute = async (req: NextApiRequest, supabase: any) => {
  const data = req.body as Webhook.Integration.Pagarme.PagarmeResponse;

  if (data.data.status === 'paid') {
    if (
      data?.['transaction[acquirer_name]'] &&
      data['transaction[customer][email]']
    ) {
      const email = data['transaction[customer][email]'];
      const name = data['transaction[customer][name]'];
      const phone_numbers = data['transaction[customer][phone_numbers][0]'];

      const user = await InviteAndSubscribe({
        supabase,
        data: {
          email: email,
          name: name,
          phone: phone_numbers ? phone_numbers : null,
          refeerer: req.query.id as string,
          customer_id: data['transaction[customer][id]'],
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
