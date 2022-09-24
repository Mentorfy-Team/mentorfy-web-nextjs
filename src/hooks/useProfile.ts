import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

export function useProfile(
  withAddress = false,
  defaultProfile?,
  defaultAddress?,
) {
  const route = useRouter();
  const logout = async () => {
    const res = await fetch(ApiRoutes.auth_logout, {
      method: 'GET',
    });
    if (res.status === 200) {
      route.push('/');
    }
  };

  const { data, error } = useSWR<
    UserTypes.ProfileWithAddress & { logout?: () => void }
  >(`${ApiRoutes.users_profile}?withAddress=${withAddress}`, fetcher, {
    fallbackData: {
      profile: defaultProfile || {},
      address: defaultAddress || {},
      logout: () => logout(),
    },
  });

  return {
    data: { ...data, logout: () => logout() },
    isLoading: !error && !data,
    isError: error,
  };
}
