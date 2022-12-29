import useSWR from 'swr';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

export function useProducts(id?, initialData?) {
  const { data, error, mutate, isLoading } = useSWR<ProductTypes.Product[]>(
    `${ApiRoutes.products_list}?id=${id}`,
    fetcher,
    {
      fallbackData: initialData,
    },
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
