import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useClients(id) {
  const { data, error, mutate } = useSWR<{
    clients: ClientTypes.Client[];
    statistics: { totalClients: number; totalAccesses: number };
  }>(`${ApiRoutes.clients_list}?id=${id}`, fetcher);

  return {
    clients: data?.clients || [],
    statistics: data?.statistics || { totalClients: 0, totalAccesses: 0 },
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
