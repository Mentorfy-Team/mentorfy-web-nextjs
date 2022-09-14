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

type UpdateProfileProps = {
  profile: UserClient.Profile;
  user: UserClient.User;
  Address: UserClient.Address;
};

export const UpdateProfile = async (values: UpdateProfileProps) => {
  try {
    const bundle = {};
    if (values.profile) bundle['profile'] = values.profile;
    if (values.user) bundle['user'] = values.user;
    if (values.Address) bundle['address'] = values.Address;

    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.users_profile,
      bundle,
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
