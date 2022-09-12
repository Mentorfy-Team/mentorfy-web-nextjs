import { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import PageWrapper from '~/components/partials/PageWrapper';
import { RecoveryProps } from '~/pages/_app';
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

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

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
          sx={{ alignSelf: 'center', minHeight: '100vh' }}
        >
          <AlignSelf pt={mobile ? 6 : 10}>
            <Image
              width={300 / (1.75 + (mobile ? 0.5 : 0))}
              height={75 / (1.75 + (mobile ? 0.5 : 0))}
              src={tipografiaImage}
              placeholder="blur"
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
