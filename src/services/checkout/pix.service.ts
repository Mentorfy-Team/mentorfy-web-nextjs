import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPixPayment = async (pix: Checkout.PixRequest) => {
  try {
    const response = await HttpClient.post(
      ApiRoutes.pix,
      pix,
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
