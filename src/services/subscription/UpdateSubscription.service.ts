import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const UpdateSubscriptionService = async (
  subscription_id: string,
  data: Pick<Pagarme.Subscription.Request, 'card' | 'customer'>,
): Promise<Pagarme.Pix.Response> => {
  try {
    const response = await HttpClient.patch(ApiRoutes.subscription, {
      subscription_id,
      data,
    });
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar a assinatura',
    } as any;
  }
};
