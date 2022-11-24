import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useProducts(id?, initialData?) {
  const { data, error, mutate } = useSWR<ProductTypes.Product[]>(
    `${ApiRoutes.products_list}?id=${id}`,
    fetcher,
    {
      fallbackData: initialData,
    },
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
