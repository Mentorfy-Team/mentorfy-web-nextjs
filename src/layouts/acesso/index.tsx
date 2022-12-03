import { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import handleAcessoSubPage from './helper/SwitchSubPages';
import {
  AlignSelf,
  BackgroundHolder,
  Grid,
  HeaderTitle,
  Wrapper,
} from './styles';
import backgroundImage from '~/../public/images/background.webp';
import tipografiaImage from '~/../public/images/logo-montanha.png';
import { userStore } from '~/stores';
import { useRouter } from 'next/router';
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import HandlePageWithParams from '~/helpers/HandlePageParams';

export type AcessoSubPage =
  | 'login'
  | 'cadastro'
  | 'trocar-senha'
  | 'esqueci-minha-senha'
  | 'sucesso'
  | 'confirmar-conta';

function LoginView({
  urlParams,
}: InferGetServerSidePropsType<typeof getProps>) {
  const mobile = useMediaQuery('(max-width:500px)');
  const { appParams, setAppParams } = userStore();
  const [info, setInfo] = useState<any>();
  const [Header, setHeader] = useState<any>();
  const router = useRouter();

  const handleSubPages = useCallback(() => {
    return handleAcessoSubPage(info, setInfo, urlParams);
  }, [info, urlParams]);

  const ImageHeader = useCallback(() => {
    return !appParams.signup ? (
      <Image
        width={340 / (1.75 + (mobile ? 0.5 : 0))}
        height={140 / (1.75 + (mobile ? 0.5 : 0))}
        src={tipografiaImage}
        alt="logo"
        style={{
          objectFit: 'contain',
        }}
        quality={80}
      />
    ) : (
      <HeaderTitle>{appParams.signup.title}</HeaderTitle>
    );
  }, [appParams.signup, mobile]);

  useEffect(() => {
    HandlePageWithParams(router, setAppParams, urlParams);
  }, [router, setAppParams, urlParams]);

  useEffect(() => {
    setHeader(<ImageHeader />);
  }, [ImageHeader]);

  return (
    <>
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
              quality={85}
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
            {Header}
          </AlignSelf>
          <Wrapper>{handleSubPages()}</Wrapper>
        </Grid>
      </Grid>
    </>
  );
}

export const getProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      urlParams: ctx.query,
    },
  };
};

export default LoginView;
