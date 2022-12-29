import { PublicRoutes } from '@app/consts';

export default function SsrIsLogged(profile?, user?) {
  if (!profile && !user) {
    return {
      redirect: {
        destination: PublicRoutes.login,
        permanent: false,
      },
    };
  }
  return;
}
