import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const CreateSubscriptionService = async (
  data: Pagarme.Subscription.Request,
): Promise<Pagarme.Pix.Response> => {
  try {
    const response = await HttpClient.post(ApiRoutes.subscription, data);
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar a assinatura',
    } as any;
  }
};
