//import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';

export const PagarmeRoute = async (req: NextApiRequest, supabase: any) => {
  const data = req.body as Webhook.Integration.Pagarme.PagarmeResponse;

  if (data.current_status === 'paid') {
    if (data?.transaction && data.transaction.customer) {
      const { email, name, phone_numbers } = data.transaction.customer;
      await InviteAndSubscribe({
        supabase,
        data: {
          email: email,
          name: name,
          phone: phone_numbers ? phone_numbers[0] : null,
          refeerer: req.query.id as string,
        },
      });
    }
  }
  // Processa o pedido

  return true;
};
