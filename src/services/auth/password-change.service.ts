import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const PasswordChange = async (
  password: string,
  access_token: string,
) => {
  try {
    const response = await HttpClient.post<AuthApi.Post.Response>(
      ApiRoutes.auth_password_change,
      {
        password,
        access_token,
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
      error: 'Erro ao cadastrar usuário',
    };
  }
};
