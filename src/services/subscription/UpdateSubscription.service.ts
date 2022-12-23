import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const UpdateSubscriptionService = async (
  subscription_id: string,
  card_id: string,
): Promise<Pagarme.Pix.Response> => {
  try {
    const response = await HttpClient.put(ApiRoutes.subscription, {
      subscription_id,
      card_id,
    });
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar a assinatura',
    } as any;
  }
};
