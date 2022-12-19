import { CheckForAccount } from '~/backend/repositories/auth/CheckForAccount';
import { GetPixRequest } from '~/backend/repositories/checkout/GetPixRequest';
import { SupabaseAdmin } from '~/backend/supabase';

type GetRequest = Checkout.Pix.Post.Request;
type GetResponse = Checkout.Post.Response;

export const post = async (req: GetRequest, res: GetResponse) => {
  const data = req.body;
  const supabase = SupabaseAdmin(req);

  const user = await CheckForAccount({
    supabase,
    data: { email: data.customer.email },
  });

  if (user) {
    if (
      user.is_subscribed &&
      user.expiration_date &&
      new Date(user.expiration_date).getTime() > Date.now()
    ) {
      return res.status(400).json({
        info: 'Assinatura já encontrada. Faça login para continuar.',
      });
    }
  }

  const conclusion = await GetPixRequest(data);

  if (!conclusion) {
    return res.status(503).json({
      info: 'Não foi possível concluir o pagamento. Tentar novamente mais tarde.',
    });
  }

  return res.status(200).json(conclusion.data);
};
