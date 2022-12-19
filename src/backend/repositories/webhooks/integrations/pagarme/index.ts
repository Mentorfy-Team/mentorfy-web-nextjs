//import { InviteAndSubscribe } from '../../../auth/InviteAndSubscribe';
import { NextApiRequest } from 'next';
import { AuthenticateRequest } from './Validations';

export const PagarmeRoute = async (req: NextApiRequest, supabase: any) => {
  const confirmation = await AuthenticateRequest(supabase, req.query, req.body);
  const data = req.body;
  if (!confirmation) return;

  // Processa o pedido

  // await InviteAndSubscribe({
  //   supabase,
  //   data: {
  //     email: data.Customer.email,
  //     name: data.Customer.full_name,
  //     phone: data.Customer.mobile?.ddd + data.Customer.mobile?.number,
  //     refeerer: req.query.id as string,
  //   },
  // });

  return true;
};
