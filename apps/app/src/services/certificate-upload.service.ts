import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const UpdateCertificate = async (
  certificate: ProductTypes.Certificate,
  title,
  id,
) => {
  try {
    const response = await HttpClient.put(ApiRoutes.products_certificate, {
      ...certificate,
      title,
      id,
    });
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao salvar o certificado',
    };
  }
};
