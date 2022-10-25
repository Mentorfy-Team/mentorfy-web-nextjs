import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useClients(id) {
  const { data, error, mutate } = useSWR<ClientTypes.Client[]>(
    `${ApiRoutes.clients_list}?id=${id}`,
    fetcher,
    {
      fallbackData: [],
    },
  );

  return {
    clients: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
