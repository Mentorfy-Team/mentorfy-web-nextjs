import { InviteAndCreateAccount } from '../../../auth/InviteAndGiveProduct';
import { NextApiRequest } from 'next';
import { AuthenticateRequest } from './Validations';

export const KiwifyRoute = async (req: NextApiRequest, supabase: any) => {
  const confirmation = await AuthenticateRequest(supabase, req.query, req.body);
  const data = req.body as Webhook.Integration.Kiwify.ApprovedPurchase;
  if (!confirmation) return;

  // Processa o pedido

  await InviteAndCreateAccount({
    supabase,
    data: {
      email: data.Customer.email,
      name: data.Customer.full_name,
      phone: data.Customer.mobile,
      refeerer: req.query.id as string,
    },
  });

  return true;
};
