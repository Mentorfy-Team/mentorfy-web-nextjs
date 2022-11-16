import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const RegisterNewUser = async (
  user: UserClient.SignUp,
  refeerer?: string,
): Promise<UsersApi.Post.Response> => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.users,
      { user, refeerer },
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error: any) {
    return {
      error: error.response?.data?.error || error.message,
    };
  }
};
