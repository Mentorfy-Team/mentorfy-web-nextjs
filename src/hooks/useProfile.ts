import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';
import SupabaseClient from '~/services/SupabaseClient';

export function useProfile(withAddress = false, altProfileId?: string) {
  const route = useRouter();
  const logout = async () => {
    SupabaseClient().auth.signOut();
    route.push('/');
  };

  const { data, error, mutate } = useSWR<
    UserTypes.ProfileWithAddress & { logout?: () => void }
  >(
    `${ApiRoutes.users_profile}?withAddress=${withAddress}${
      altProfileId ? `&id=${altProfileId}` : ''
    }`,
    fetcher,
  );

  return {
    data: { ...data, logout: () => logout() },
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
