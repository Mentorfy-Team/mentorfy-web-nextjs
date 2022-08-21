import { useCallback, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Cadastro from './cadastro';
import ConfirmarConta from './confirmar-conta';
import EsqueciMinhaSenha from './esqueci-minha-senha';
import Login from './login';
import { AlignSelf, BackgroundHolder, Grid, Wrapper } from './styles';
import Sucesso from './sucesso';
import TrocarSenha from './trocar-senha';

export type AcessoSubPage =
  | 'login'
  | 'cadastro'
  | 'trocar-senha'
  | 'esqueci-minha-senha'
  | 'sucesso'
  | 'confirmar-conta';

function LoginView({}: InferGetStaticPropsType<typeof getProps>) {
  const mobile = useMediaQuery('(max-width:490px)');
  const [AcessosubPage, setAcessoSubPage] = useState<AcessoSubPage>('login');
  const [info, setInfo] = useState<any>();

  const handleAcessoSubPage = useCallback(() => {
    switch (AcessosubPage) {
      case 'login':
        return <Login pageChange={setAcessoSubPage} />;
      case 'cadastro':
        return <Cadastro setInfo={setInfo} pageChange={setAcessoSubPage} />;
      case 'trocar-senha':
        return <TrocarSenha setInfo={setInfo} pageChange={setAcessoSubPage} />;
      case 'esqueci-minha-senha':
        return <EsqueciMinhaSenha pageChange={setAcessoSubPage} />;
      case 'confirmar-conta':
        return <ConfirmarConta pageChange={setAcessoSubPage} />;
      case 'sucesso':
        return <Sucesso info={info} pageChange={setAcessoSubPage} />;
    }
  }, [AcessosubPage, info]);

  return (
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
        <Wrapper p={5}>{handleAcessoSubPage()}</Wrapper>
      </Grid>
    </Grid>
  );
}

export async function getProps() {
  return {
    props: {},
    revalidate: 1,
  };
}

export default LoginView;
