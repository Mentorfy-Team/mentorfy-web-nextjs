import useSWR from 'swr';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

export function useClients(id, penddingProval?, relationRef?) {
  const { data, error, mutate, isLoading } = useSWR<{
    clients: ClientTypes.Client[];
    statistics: { totalClients: number; totalAccesses: number };
  }>(
    `${ApiRoutes.clients_list}?id=${id}${
      penddingProval ? '&approved=false' : ''
    }${relationRef ? '&relationRef=' + relationRef : ''}`,
    fetcher,
  );

  return {
    clients: data?.clients || [],
    statistics: data?.statistics || { totalClients: 0, totalAccesses: 0 },
    isLoading,
    isError: error,
    mutate,
  };
}
