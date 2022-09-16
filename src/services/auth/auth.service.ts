import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '~/@types/api/auth/auth';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { CookieUtil } from '~/shared/utils';
import { HttpClient } from '../HttpClient';

export const Authenticate = async (auth: Auth) => {
  try {
    await HttpClient.post<UsersApi.Post.Response>(ApiRoutes.auth, auth);

    console.log('Cookie', CookieUtil.get());
    const response = {
      data: {
        error: null,
      },
    };
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
