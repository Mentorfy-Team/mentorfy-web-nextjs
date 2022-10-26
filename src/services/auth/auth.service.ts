import { Auth } from '~/@types/api/auth/auth';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { CookieUtil } from '~/shared/utils/cookie/cookie.util';
import { HttpClient } from '../HttpClient';

export const Authenticate = async (
  auth: Auth,
): Promise<UsersApi.Post.Response> => {
  try {
    await HttpClient.post<UsersApi.Post.Response>(ApiRoutes.auth, auth);
    
    const response = {
      data: {
        error: null,
      },
    };
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    } else {
      return response.data as UsersApi.Post.Response;
    }
  } catch (error) {
    return {
      error: 'Erro ao cadastrar usuário',
    };
  }
};
