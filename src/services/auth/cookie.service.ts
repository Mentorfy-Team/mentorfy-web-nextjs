import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const UpdateCookies = async (event: any, session: any) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.auth_cookies,
      {
        event,
        session,
      },
      {
        headers: { 'Content-Type': 'application/json' },
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
