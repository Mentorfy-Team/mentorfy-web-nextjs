import useSWR from 'swr';
import { GroupTools } from '~/components/modules/DragNDrop';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMemberAreaTools(id) {
  const { data, error, mutate } = useSWR<GroupTools[]>(
    `${ApiRoutes.member_areas_tool_list}?id=${id}`,
    fetcher,
  );

  return {
    steps: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
