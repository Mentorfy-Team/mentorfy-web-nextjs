import useSWR from 'swr';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

type props = Partial<ProductTypes.Product>[];

export function useGetClientProducts(id, related_id?, initialData?) {
  const { data, error, isLoading } = useSWR<props>(
    `${ApiRoutes.client_products}?id=${id}${
      related_id ? `&related_id=${related_id}` : ''
    }`,
    fetcher,
    {
      fallbackData: initialData,
    },
  );

  return {
    product: data || [],
    isLoading,
    isError: error,
  };
}
