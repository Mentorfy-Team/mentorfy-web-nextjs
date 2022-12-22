import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPayment = async (data: Pagarme.Subscription.Request) => {
  try {
    const response = await HttpClient.post<Pagarme.Subscription.Response>(
      ApiRoutes.checkout,
      data,
    );
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao efetuar o pagamento',
    } as any;
  }
};
