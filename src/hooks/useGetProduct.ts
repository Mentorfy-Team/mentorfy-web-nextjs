import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

type props = Partial<ProductTypes.Product> & {
  member_area?: {
    id: string;
    created_at: string;
    type_id: number;
  }[];
};

export function useGetProduct(id) {
  const { data, error } = useSWR<{ product?: props }>(
    `${ApiRoutes.products}?id=${id}`,
    fetcher,
    {
      fallbackData: { product: {} },
    },
  );

  return {
    product: data.product,
    isLoading: !error && !data,
    isError: error,
  };
}
