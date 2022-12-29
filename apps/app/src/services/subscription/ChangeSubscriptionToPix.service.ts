import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const ChangeSubscriptionToPixService = async (
  subscription_id: string,
): Promise<Pagarme.Pix.Response> => {
  try {
    const response = await HttpClient.delete(ApiRoutes.subscription, {
      params: {
        subscription_id,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar a assinatura',
    } as any;
  }
};
