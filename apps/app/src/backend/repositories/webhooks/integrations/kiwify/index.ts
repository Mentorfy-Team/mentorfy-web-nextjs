import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { AuthenticateRequest } from './Validations';
import { GiveProductToClient } from '@app/backend/repositories/product/GiveProductToClient';
import { CreateCustomerPagarme } from '@app/backend/repositories/user/CreateCustomerPagarme';

export const KiwifyRoute = async (req: NextApiRequest, supabase: any) => {
  const MentorFy = (req.query.id as string) + '' === '256525';

  let confirmation;
  if (MentorFy) {
    confirmation = await AuthenticateRequest(
      supabase,
      req.query,
      req.body,
      true,
    );
  } else {
    confirmation = await AuthenticateRequest(supabase, req.query, req.body);
  }
  const data = req.body as Webhook.Integration.Kiwify.ApprovedPurchase;

  if (!confirmation) return;

  // Processa o pedido
  const phone = data.Customer.mobile?.ddd + data.Customer.mobile?.number;

  const response = await CreateCustomerPagarme({
    email: data.Customer.email,
    name: data.Customer.full_name,
    country: 'br',
    phone_numbers: [phone],
    type: 'individual',
    external_id: 'webhook api',
    documents: [
      {
        type: 'cpf',
        number: data.Customer.CPF,
      },
    ],
  });

  const user = await InviteAndSubscribe({
    supabase,
    data: {
      email: data.Customer.email,
      name: data.Customer.full_name,
      phone: phone,
      refeerer: MentorFy ? null : req.query.id,
      customer_id: response.data.id + '',
    },
  });

  if (!MentorFy)
    await GiveProductToClient(supabase, {
      user_id: user.id,
      refeerer: req.query.id as string,
    });

  return true;
};
