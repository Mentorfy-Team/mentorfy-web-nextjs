import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useUserInputs(member_area_id) {
  const { data, error, isLoading } = useSWR<MemberAreaTypes.UserInput[]>(
    `${ApiRoutes.member_areas_client_input}?id=${member_area_id}`,
    fetcher,
  );

  return {
    inputs: !(data as any)?.error ? data || [] : [],
    isLoading,
    isError: error,
  };
}
