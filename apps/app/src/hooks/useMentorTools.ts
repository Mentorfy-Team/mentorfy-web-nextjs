import useSWR from 'swr';
import { ApiRoutes } from '@app/consts/routes/api.routes';
import { fetcher } from '@app/hooks/fetcher';

export function useMentorTools(area_id?: string) {
  const { data, error, mutate, isLoading } = useSWR<MentorTools.ToolType[]>(
    `${ApiRoutes.mentor_tools_type}${area_id ? `?id=${area_id}` : ''}`,
    fetcher,
  );

  return {
    tools: data,
    isLoading,
    isError: error,
    mutate,
  };
}
