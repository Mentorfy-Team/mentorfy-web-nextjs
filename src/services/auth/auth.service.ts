import { Auth } from '~/@types/api/auth/auth';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const Authenticate = async (
  auth: Auth,
): Promise<UsersApi.Post.Response> => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.auth,
      auth,
    );

    if (response.data.error) {
      return {
        error: response.data.error,
      };
    } else {
      return response.data as UsersApi.Post.Response;
    }
  } catch (error) {
    return {
      error: 'Erro ao authenticar usuário',
    };
  }
};
