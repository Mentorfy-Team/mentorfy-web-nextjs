import useSWR from 'swr';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

export function useHistory(id) {
  const { data, error, mutate, isLoading } = useSWR<LogTypes.History[]>(
    `${ApiRoutes.history}?id=${id}`,
    fetcher,
  );

  return {
    history: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
