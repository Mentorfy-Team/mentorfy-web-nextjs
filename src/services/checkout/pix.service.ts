import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPixPayment = async (pix: Pagarme.Pix.Request) => {
  try {
    const response = await HttpClient.post<Pagarme.Pix.Response>(
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
