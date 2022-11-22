import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMentorTools(area_id?: string) {
  const { data, error, mutate } = useSWR<MentorTools.ToolType[]>(
    `${ApiRoutes.mentor_tools_type}${area_id ? `?id=${area_id}` : ''}`,
    fetcher,
  );

  return {
    tools: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
