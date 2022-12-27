import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useTeams(id) {
  const { data, error, mutate, isLoading } = useSWR<TeamTypes.TeamTree[]>(
    `${ApiRoutes.teams_list}?id=${id}`,
    fetcher,
  );

  return {
    data: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
