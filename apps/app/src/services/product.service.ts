//CreateProduct
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProductByRef = async (
  req,
  refId,
): Promise<{ product: ProductApi.Product }> => {
  try {
    const response = await HttpClient.get<any>(ApiRoutes.products, {
      // * Passa a autenticação para frente
      headers: req.headers,
      params: {
        refId,
      },
    });

    if (response.data.error || !response.data.product) {
      throw new Error(response.data.error);
    }
    return response.data as { product: ProductApi.Product };
  } catch (error: any) {
    return {
      error: error.message,
    } as any;
  }
};

export const GetProduct = async (req, id): Promise<ProductApi.Product> => {
  try {
    const response = await HttpClient.get<any>(ApiRoutes.products, {
      // * Passa a autenticação para frente
      headers: req.headers,
      params: {
        id,
      },
    });

    if (response.data.error || !response.data.product) {
      throw new Error(response.data.error);
    }
    return response?.data?.product ? response.data.product : response.data;
  } catch (error: any) {
    return {
      error: error.message,
    } as any;
  }
};

export const ListProducts = async (
  token,
  id?,
): Promise<ProductApi.List.Response> => {
  try {
    const response = await HttpClient.get<any>(ApiRoutes.products_list, {
      // * Passa a autenticação para frente
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
    });
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return {
      products: response.data,
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
