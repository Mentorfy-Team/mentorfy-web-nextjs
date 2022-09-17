import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useProducts(id) {
  const { data, error } = useSWR<ProductTypes.Product[]>(
    `${ApiRoutes.products_list}?id=${id}`,
    fetcher,
    {
      fallbackData: [],
    },
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}
