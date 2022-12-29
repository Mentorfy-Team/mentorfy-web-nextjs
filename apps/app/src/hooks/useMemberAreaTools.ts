import useSWR from 'swr';
import { GroupTools } from '@app/components/modules/DragNDrop';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

export function useMemberAreaTools(id) {
  const { data, error, mutate, isLoading } = useSWR<GroupTools[]>(
    `${ApiRoutes.member_areas_tool_list}?id=${id}`,
    fetcher,
  );

  return {
    steps: data ? data : [],
    isLoading,
    isError: error,
    mutate,
  };
}
