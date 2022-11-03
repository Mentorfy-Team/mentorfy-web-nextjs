import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

type props = Partial<ProductTypes.ClientJorney>;

export function useListOfClientsInProduct(id) {
  const { data, error } = useSWR<props>(
    `${ApiRoutes.products_clients_list}?id=${id}`,
    fetcher,
  );

  return {
    data: data || {},
    isLoading: !error && !data,
    isError: error,
  };
}
