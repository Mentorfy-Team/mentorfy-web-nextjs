import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useProfile(withAddress = false) {
  const { data, error } = useSWR<UserTypes.User[]>(
    `${ApiRoutes.users_profile}?withAddress=${withAddress}`,
    fetcher,
    {
      fallbackData: [],
    },
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
