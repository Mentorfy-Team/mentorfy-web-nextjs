import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProfile = async (req, withAddress = false) => {
  try {
    const response = await HttpClient.get<UsersApi.Post.Response>(
      ApiRoutes.users_profile,
      {
        // * Passa a autenticação para frente
        headers: req.headers,
        params: {
          withAddress,
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
  profile: Partial<UserClient.Profile>;
  user: Partial<UserClient.User>;
  address: Partial<UserClient.Address>;
};

export const UpdateProfile = async (values: UpdateProfileProps) => {
  try {
    const bundle = {};
    if (values.profile) bundle['profile'] = values.profile;
    if (values.user) bundle['user'] = values.user;
    if (values.address) bundle['address'] = values.address;

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
