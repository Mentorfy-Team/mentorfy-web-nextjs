import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';
import { CheckForAccount } from '@app/backend/repositories/auth/CheckForAccount';
import { InviteAndSubscribe } from '@app/backend/repositories/auth/InviteAndSubscribe';
import { CreateSubscription } from '@app/backend/repositories/pagarme/subscription/CreateSubscription';
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
        message: 'Você já possui uma assinatura ativa.',
      } as Pagarme.Subscription.DataError);
    }
  }

  const result = await CreateSubscription(data);

  if (!result.errors && !(result as any).message) {
    const phone =
      result.customer.phones?.mobile_phone?.area_code +
      result.customer.phones?.mobile_phone?.number;
    await InviteAndSubscribe({
      supabase,
      data: {
        email: result.customer.email,
        name: result.customer.name,
        phone: result.customer.phones?.mobile_phone ? phone : null,
        refeerer: null,
        customer_id: result.customer.id,
        card_id: data.save_card ? result.card.id : null,
        plan_id: result.plan.id,
        subscription_id: result.id,
        address: data.customer.address,
      },
    });
  } else {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
};

export const get = async (req: GetRequest, res: GetResponse) => {
  const response = await HttpPagarme.get('/plans');

  return res.status(200).json(response.data);
};
