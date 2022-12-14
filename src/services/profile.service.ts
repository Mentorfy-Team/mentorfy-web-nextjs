import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProfile = async (
  req?,
  withAddress = false,
  id?,
): Promise<ProfileApi.Get.Response> => {
  try {
    const headers = req ? { headers: req.headers } : {};
    const response = await HttpClient.get<ProfileApi.Get.Response>(
      ApiRoutes.users_profile + `${id ? `?id=${id}` : ''}`,
      {
        // * Passa a autenticação para frente
        ...headers,
        params: {
          withAddress,
        },
      },
    );

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
  avatar?: Partial<{
    file: string;
    type: string;
  }>;
  old_avatar?: string;
};

export const UpdateProfile = async (values: UpdateProfileProps) => {
  try {
    const bundle = {};
    if (Object.keys(values.profile).length > 0)
      bundle['profile'] = values.profile;
    if (Object.keys(values.user).length > 0) bundle['user'] = values.user;
    if (Object.keys(values.address).length > 0)
      bundle['address'] = values.address;
    if (Object.keys(values.avatar.file)) {
      bundle['avatar'] = values.avatar;
      bundle['old_avatar'] = values.old_avatar;
    }

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
