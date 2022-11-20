import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useMentorTools() {
  const { data, error } = useSWR<MentorTools.ToolType[]>(
    `${ApiRoutes.mentor_tools_type}`,
    fetcher,
  );

  return {
    tools: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
