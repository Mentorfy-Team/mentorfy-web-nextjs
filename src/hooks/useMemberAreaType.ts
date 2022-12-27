import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMemberAreaTypes() {
  const { data, error, mutate, isLoading } = useSWR<MemberAreaTypes.Type[]>(
    `${ApiRoutes.member_areas_type_list}`,
    fetcher,
  );

  return {
    types: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
