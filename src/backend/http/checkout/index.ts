import { HttpServer } from '~/backend/helpers/HttpClient';
import { CheckForAccount } from '~/backend/repositories/auth/CheckForAccount';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';
import { SendPaymentRequest } from '~/backend/repositories/checkout/SendPaymentRequest';
import { SupabaseAdmin } from '../../supabase';

type GetRequest = Checkout.Post.Request;
type GetResponse = Checkout.Post.Response;

export const post = async (req: GetRequest, res: GetResponse) => {
  const supabase = SupabaseAdmin(req);
  const data = req.body;

  if (!data.customer || (!data.card && !data.card_id)) {
    return res.status(401).json({
      info: 'Dados incorretos ou incompletos.',
    });
  }

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

  const paymentResult = await SendPaymentRequest(data);

  if (paymentResult) {
    await InviteAndSubscribe({
      supabase,
      data: {
        email: data.customer.email,
        name: data.customer.name,
        phone: data.customer.phone.ddd + data.customer.phone.number,
        refeerer: null,
        customer_id: paymentResult.data.subscription.customer.id,
      },
    });
  } else {
    return res.status(503).json({
      info: 'Não foi possível concluir o pagamento. Revise os dados do cartão.',
    });
  }

  return res.status(200).json({
    info: JSON.stringify(paymentResult),
  });
};

export const get = async (req: GetRequest, res: GetResponse) => {
  const response = await HttpServer.get('/plans');

  return res.status(200).json(response.data);
};
