import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPixPayment = async (
  pix: Checkout.PixRequest,
): Promise<Checkout.PixResponse> => {
  try {
    const response = await HttpClient.post<Checkout.PixResponse>(
      ApiRoutes.pix,
      pix,
    );
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao efetuar o pagamento',
    } as any;
  }
};
