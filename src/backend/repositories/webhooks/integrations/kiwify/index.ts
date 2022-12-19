import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { AuthenticateRequest } from './Validations';
import { GiveProductToClient } from '~/backend/repositories/product/GiveProductToClient';

export const KiwifyRoute = async (req: NextApiRequest, supabase: any) => {
  const confirmation = await AuthenticateRequest(supabase, req.query, req.body);
  const data = req.body as Webhook.Integration.Kiwify.ApprovedPurchase;
  if (!confirmation) return;

  // Processa o pedido

  const user = await InviteAndSubscribe({
    supabase,
    data: {
      email: data.Customer.email,
      name: data.Customer.full_name,
      phone: data.Customer.mobile?.ddd + data.Customer.mobile?.number,
      refeerer: req.query.id as string,
    },
  });

  await GiveProductToClient(supabase, {
    user_id: user.id,
    refeerer: req.query.id as string,
  });

  return true;
};
