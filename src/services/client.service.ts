import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetClient = async (
  req,
  withAddress = false,
): Promise<ProfileApi.Get.Response> => {
  try {
    const response = await HttpClient.get<ProfileApi.Get.Response>(
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

export const CreateClient = async (client: UserClient.CreateClient) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.clients,
      client,
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao cadastrar produto',
    };
  }
};

export const ApprovalClient = async (
  client_id: string,
  product_id: string,
  approved,
) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.member_areas_client_approval,
      { client_id, product_id, approved },
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao cadastrar produto',
    };
  }
};

export const ListClients = async (
  token,
  id,
): Promise<UserClient.Post.ClientsResponse> => {
  try {
    const {
      data: { error, result },
    } = await HttpClient.get<UserClient.Post.ClientsResponse>(
      ApiRoutes.clients_list,
      {
        // * Passa a autenticação para frente
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id,
        },
      },
    );

    if (error) {
      return {
        error,
      };
    }
    return {
      result,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
