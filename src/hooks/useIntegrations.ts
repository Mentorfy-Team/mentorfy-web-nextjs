import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useIntegrations(id) {
  const { data, error, mutate, isLoading } = useSWR<
    { type: string; token: string }[]
  >(`${ApiRoutes.member_areas_integration}?id=${id}`, fetcher);

  return {
    data: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
