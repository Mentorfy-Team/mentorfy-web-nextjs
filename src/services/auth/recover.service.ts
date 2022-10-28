import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const PasswordRecover = async (email: string) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.auth_recover,
      {
        email,
      },
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao tentar recuperar a senha usuário',
    };
  }
};
