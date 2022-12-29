import { setCookie } from 'cookies-next';
import { NextRouter } from 'next/router';
import { GetProductLogo } from '@app/services/getProductLogo.service';

export type RecoveryProps = {
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  type: string;
};

const HandlePageWithParams = async (
  router: NextRouter,
  setAppParams,
  urlParams,
) => {
  if (!urlParams || JSON.stringify(urlParams) === '{}') {
    setAppParams({ subpage: 'login', signup: null });
  }

  //? [ Supabase auth ] [ MENTOR ]
  //* Se tiver o token de acesso, salva no localStorage e redireciona para a página inicial
  if (urlParams.access_token && urlParams.type == 'magiclink') {
    setCookie('sb-refresh-token', urlParams.refresh_token);
    setCookie('sb-access-token', urlParams.access_token);

    if (router.pathname === '/') {
      router.push('/mentor/dashboard');
    }
  }

  if (urlParams.type == 'invite' || urlParams.type == 'recovery') {
    setCookie('sb-refresh-token', urlParams.refresh_token);
    setCookie('sb-access-token', urlParams.access_token);
    setAppParams({ subpage: 'trocar-senha' });
  }

  //? [ Mentorfy ]
  if (urlParams.signup) {
    const product = await GetProductLogo(urlParams.signup);
    if (product) {
      if (urlParams.mb) {
        setAppParams({
          subpage: 'cadastro',
          signup: {
            refeerer: urlParams.signup,
            image: product.main_image,
            title: product.title,
            id: product.id,
          },
        });
      } else if (urlParams.signup) {
        setAppParams({
          subpage: 'cadastro',
          signup: {
            refeerer: urlParams.signup,
            image: product.main_image,
            title: product.title,
            id: product.id,
          },
        });
      }
    }
  }
};

export default HandlePageWithParams;
