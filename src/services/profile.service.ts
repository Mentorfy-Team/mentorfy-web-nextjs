import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProfile = async (req) => {
  try {
    const response = await HttpClient.get<UsersApi.Post.Response>(
      ApiRoutes.users_profile,
      {
        headers: {
          cookie: req.headers.cookie,
        },
      },
    );

    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
