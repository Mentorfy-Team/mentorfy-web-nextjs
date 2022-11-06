import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

type props = Partial<ProductTypes.Product>[];

export function useGetClientProducts(id, related_id?) {
  const { data, error } = useSWR<props>(
    `${ApiRoutes.client_products}?id=${id}${
      related_id ? `&related_id=${related_id}` : ''
    }`,
    fetcher,
  );

  return {
    product: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
