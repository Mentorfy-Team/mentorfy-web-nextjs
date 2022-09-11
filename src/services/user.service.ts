import { NewUserForm } from '~/@types/api/users/user';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const RegisterNewUser = async (user: NewUserForm) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.users,
      user,
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
