import { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import PageWrapper from '~/components/partials/PageWrapper';
import { handleAcessoSubPage } from './helper/SwitchSubPages';
import { AlignSelf, BackgroundHolder, Grid, Wrapper } from './styles';
import backgroundImage from '~/../public/images/background-login.jpg';
import tipografiaImage from '~/../public/images/tipografia.png';

export type AcessoSubPage =
  | 'login'
  | 'cadastro'
  | 'trocar-senha'
  | 'esqueci-minha-senha'
  | 'sucesso'
  | 'confirmar-conta';

function LoginView(props: InferGetStaticPropsType<typeof getProps>) {
  const mobile = useMediaQuery('(max-width:500px)');
  const [AcessosubPage, setAcessoSubPage] = useState<AcessoSubPage>('login');
  const route = useRouter();
  const [info, setInfo] = useState<any>();
  const [urlProps, setUrlProps] = useState<any>();

  useEffect(() => {
    if ((props as any).urlParams) {
      setUrlProps((props as any).urlParams);
    }
  }, [props, route.pathname]);

  const handleSubPages = useCallback(() => {
    return handleAcessoSubPage(
      AcessosubPage,
      setAcessoSubPage,
      info,
      setInfo,
      urlProps,
    );
  }, [AcessosubPage, info, urlProps]);

  return (
    <PageWrapper>
      <Grid container>
        <Grid xs={0} lg={6.5}>
          <BackgroundHolder>
            <Image
              fill
              style={{
                objectFit: 'cover',
              }}
              alt="some important man mentoring smart people"
              src={backgroundImage}
              quality={100}
              placeholder="blur"
            />
          </BackgroundHolder>
        </Grid>

        <Grid
          overflow="auto"
          height="100vh"
          display={'flex'}
          flexDirection="column"
          xs={12}
          lg={5.5}
        >
          <AlignSelf pt={mobile ? 6 : 10} pb={4}>
            <Image
              width={300 / (1.75 + (mobile ? 0.5 : 0))}
              height={75 / (1.75 + (mobile ? 0.5 : 0))}
              src={tipografiaImage}
              placeholder="blur"
              alt="logo"
            />
          </AlignSelf>
          <Wrapper>{handleSubPages()}</Wrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

export async function getProps(params) {
  return {
    props: {},
  };
}

export default LoginView;
