import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMemberAreaTypes() {
  const { data, error, mutate } = useSWR<MemberAreaTypes.Type[]>(
    `${ApiRoutes.member_areas_type_list}`,
    fetcher,
    {
      fallbackData: [],
    },
  );

  return {
    types: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
