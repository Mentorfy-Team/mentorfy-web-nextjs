import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useProfile(
  withAddress = false,
  defaultProfile,
  defaultAddress,
) {
  const { data, error } = useSWR<UserTypes.ProfileWithAddress>(
    `${ApiRoutes.users_profile}?withAddress=${withAddress}`,
    fetcher,
    {
      fallbackData: {
        profile: defaultProfile || {},
        address: defaultAddress || {},
      },
    },
  );
  console.log('update', data, error);
  return {
    data: { ...data },
    isLoading: !error && !data,
    isError: error,
  };
}
