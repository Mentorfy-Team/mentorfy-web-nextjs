import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

type AddMentorDTO = {
  team_id: string;
  name: string;
  email: string;
  phone: string;
  limit: string;
};

type DeleteMentorDTO = {
  profile_id: string;
  teams: string[];
  reason: string;
};

export const AddMentor = async (formData: AddMentorDTO) => {
  try {
    const response = await HttpClient.post(ApiRoutes.teams_mentor, formData);

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

export const AssignClients = async (formData: AddMentorDTO) => {
  try {
    const response = await HttpClient.post(ApiRoutes.teams_client, formData);

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

export const DeleteMentor = async (formData: DeleteMentorDTO) => {
  try {
    const response = await HttpClient.delete(ApiRoutes.teams_mentor, {
      data: formData,
    });

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

export const DeleteTeam = async (formData: DeleteMentorDTO) => {
  try {
    const response = await HttpClient.delete(ApiRoutes.teams, {
      data: formData,
    });

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

export const DeleteAttr = async (formData: DeleteMentorDTO) => {
  try {
    const response = await HttpClient.delete(ApiRoutes.teams_client, {
      data: formData,
    });

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

export const CreateTeam = async (title) => {
  try {
    const response = await HttpClient.post(ApiRoutes.teams, {
      title,
    });
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

export const AddProductAttr = async ({ team_id, products }) => {
  const response = await HttpClient.put(ApiRoutes.teams_product, {
    team_id,
    products,
  });
  return response.data;
};

export const DeleteProductAttr = async ({ team_id, products }) => {
  const response = await HttpClient.put(ApiRoutes.teams_product, {
    params: {
      team_id,
      products,
    },
  });
  return response.data;
};

export const ListTeams = async (token, id) => {
  try {
    const {
      data: { error, result },
    } = await HttpClient.get(ApiRoutes.clients_list, {
      // * Passa a autenticação para frente
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
    });

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
