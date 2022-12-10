import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const UpdateCertificate = async (certificate: ProductClient.Product) => {
  try {
    const response = await HttpClient.put<ProductApi.Post.Response>(
      ApiRoutes.products_certificate,
      certificate
    );
    if (response.data.error) {
      return {
        error: response.data.error
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao salvar o certificado'
    };
  }
};
