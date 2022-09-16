//CreateProduct
import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProduct = async (req, id): Promise<ProductApi.Get.Response> => {
  try {
    const response = await HttpClient.get<ProductApi.Get.Response>(
      ApiRoutes.products,
      {
        // * Passa a autenticação para frente
        headers: req.headers,
        params: {
          id,
        },
      },
    );

    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data.product;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const ListProducts = async (
  token,
  id,
): Promise<ProductApi.List.Response> => {
  try {
    const response = await HttpClient.get<ProductApi.List.Response>(
      ApiRoutes.products_list,
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

    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return {
      products: response.data.products,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const CreateProduct = async (product: ProductClient.CreateProduct) => {
  try {
    const response = await HttpClient.post<ProductApi.Post.Response>(
      ApiRoutes.products,
      product,
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

export const UpdateProduct = async (product: ProductClient.CreateProduct) => {
  try {
    const response = await HttpClient.put<ProductApi.Post.Response>(
      ApiRoutes.products,
      product,
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar o produto',
    };
  }
};
