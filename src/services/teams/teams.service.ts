import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const AddMentor = async (formData): Promise<ProfileApi.Get.Response> => {
  try {
    const response = await HttpClient.post<ProfileApi.Get.Response>(
      ApiRoutes.teams_mentor,
      formData,
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

export const AddClientMentor = async (client: UserClient.CreateClient) => {
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

export const CreateTeam = async (title) => {
  try {
    const response = await HttpClient.post<UsersApi.Post.Response>(
      ApiRoutes.teams,
      {
        title,
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
      error: 'Erro ao cadastrar produto',
    };
  }
};

export const ListTeams = async (
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
