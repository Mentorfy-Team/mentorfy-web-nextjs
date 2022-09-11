import { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PageWrapper from '~/components/partials/PageWrapper';
import { RecoveryProps } from '~/pages/_app';
import { handleAcessoSubPage } from './helper/SwitchSubPages';
import { AlignSelf, BackgroundHolder, Grid, Wrapper } from './styles';

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
    <PageWrapper darkMode={false}>
      <Grid container>
        <Grid xs={0} lg={6.5}>
          <BackgroundHolder>
            <Image
              alt="some important man mentoring smart people"
              src="/images/background-login.jpg"
              layout="fill"
              objectFit="cover"
              quality={100}
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
          sx={{ alignSelf: 'center', minHeight: '100vh' }}
        >
          <AlignSelf pt={mobile ? 6 : 10}>
            <Image
              width={300 / (1.75 + (mobile ? 0.5 : 0))}
              height={75 / (1.75 + (mobile ? 0.5 : 0))}
              layout="fixed"
              src="/images/tipografia.png"
              alt="logo"
            />
          </AlignSelf>
          <Wrapper p={5}>{handleSubPages()}</Wrapper>
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
