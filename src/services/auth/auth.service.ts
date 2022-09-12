import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '~/@types/api/auth/auth';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const Authenticate = async (auth: Auth) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.auth,
      auth,
    );
    let responseCookie;

    if (response.data) {
      const { session } = response.data;
      responseCookie = await HttpClient.post<UsersApi.Post.Response>(
        ApiRoutes.auth_cookies,
        {
          event: 'SIGNED_IN',
          session,
        },
        {
          headers: {
            Authenticate: `Bearer ${session.access_token}`,
          },
        },
      );
    }
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return responseCookie?.data;
  } catch (error) {
    return {
      error: 'Erro ao cadastrar usuário',
    };
  }
};
