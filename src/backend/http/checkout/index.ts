import { HttpPagarme } from '~/backend/helpers/HttpPagarme';
import { CheckForAccount } from '~/backend/repositories/auth/CheckForAccount';
import { InviteAndSubscribe } from '~/backend/repositories/auth/InviteAndSubscribe';
import { CreateSubscription } from '~/backend/repositories/pagarme/subscription/CreateSubscription';
import { SupabaseAdmin } from '../../supabase';

type GetRequest = Checkout.Post.Request;
type GetResponse = Checkout.Post.Response;

// * Esse processo considera apenas pagamento com cartão
// * Pois pix retorna a confirmação via webhook

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

  const paymentResult = await CreateSubscription(data);

  if (paymentResult) {
    const phone =
      paymentResult.customer.phones?.mobile_phone?.area_code +
      paymentResult.customer.phones?.mobile_phone?.number;
    await InviteAndSubscribe({
      supabase,
      data: {
        email: paymentResult.customer.email,
        name: paymentResult.customer.name,
        phone: paymentResult.customer.phones?.mobile_phone ? phone : null,
        refeerer: null,
        customer_id: paymentResult.customer.id,
        card_id: data.save_card ? paymentResult.card.id : null,
        plan_id: paymentResult.plan.id,
        subscription_id: paymentResult.id,
      },
    });
  } else {
    return res.status(503).json({
      info: 'Não foi possível concluir o pagamento. Revise os dados do cartão.',
    });
  }

  return res.status(200).json(paymentResult);
};

export const get = async (req: GetRequest, res: GetResponse) => {
  const response = await HttpPagarme.get('/plans');

  return res.status(200).json(response.data);
};
