import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPayment = async (data: Checkout.PaymentRequest) => {
  try {
    const response = await HttpClient.post(
      ApiRoutes.checkout,
      data,
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao efetuar o pagamento',
    };
  }
};
