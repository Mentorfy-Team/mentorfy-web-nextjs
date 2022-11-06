import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMemberAreas(id) {
  const { data, error } = useSWR<MemberAreaTypes.MemberArea[]>(
    `${ApiRoutes.member_areas_list}?id=${id}`,
    fetcher,
  );
  return {
    memberAreas: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
