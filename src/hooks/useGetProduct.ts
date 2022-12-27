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

export function useGetProduct(id, defaultProps?) {
  const fallbackData = defaultProps ? { fallbackData: defaultProps } : {};
  const { data, error, isLoading } = useSWR<{ product?: props }>(
    `${ApiRoutes.products}?id=${id}`,
    fetcher,
    {
      ...fallbackData,
    },
  );

  return {
    product: data ? data.product : {},
    isLoading,
    isError: error,
  };
}
