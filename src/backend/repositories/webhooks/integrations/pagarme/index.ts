//import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';

export const PagarmeRoute = async (req: NextApiRequest, supabase: any) => {
  const data = req.body as Webhook.Integration.Pagarme.PagarmeResponse;

  if (data.current_status === 'paid') {
    if (
      data?.['transaction[acquirer_name]'] &&
      data['transaction[customer][email]']
    ) {
      const email = data['transaction[customer][email]'];
      const name = data['transaction[customer][name]'];
      const phone_numbers = data['transaction[customer][phone_numbers][0]'];

      await InviteAndSubscribe({
        supabase,
        data: {
          email: email,
          name: name,
          phone: phone_numbers ? phone_numbers : null,
          refeerer: req.query.id as string,
          customer_id: data['transaction[customer][id]'],
        },
      });
    }
  }
  // Processa o pedido

  return true;
};
