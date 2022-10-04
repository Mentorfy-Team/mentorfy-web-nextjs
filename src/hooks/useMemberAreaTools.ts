import useSWR from 'swr';
import { DnDRow } from '~/components/modules/DragNDrop';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMemberAreaTools(id) {
  const { data, error } = useSWR<DnDRow[]>(
    `${ApiRoutes.member_areas_tool_list}?id=${id}`,
    fetcher,
    {
      fallbackData: [],
    },
  );
  return {
    tools: data,
    isLoading: !error && !data,
    isError: error,
  };
}
