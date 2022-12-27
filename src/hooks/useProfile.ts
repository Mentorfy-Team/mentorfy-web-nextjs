import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';
import SupabaseClient from '~/services/SupabaseClient';

export function useProfile(withAddress = false, altProfileId?: string) {
  const route = useRouter();
  const logout = async () => {
    await SupabaseClient().auth.signOut();
    // remove the cookie
    document.cookie =
      'supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    route.push('/');
  };

  const { data, error, mutate, isLoading } = useSWR<
    UserTypes.ProfileWithAddress & { logout?: () => void }
  >(
    `${ApiRoutes.users_profile}?withAddress=${withAddress}${
      altProfileId ? `&id=${altProfileId}` : ''
    }`,
    fetcher,
  );

  return {
    data: { ...data, logout: () => logout() },
    isLoading,
    isError: error,
    mutate,
  };
}
