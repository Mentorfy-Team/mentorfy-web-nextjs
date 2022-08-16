import { Provider as StoreProvider } from 'jotai';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Routes } from '~/consts';
// import {HeaderPartial, LoadingPartial} from '~/';
import { UserDataStore } from '~/stores';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { Meta, PageWrapper, Title, Wrapper } from './_app.styles';

const App = ({ Component, pageProps }: AppProps) => {
  //const router = useRouter();

  // useEffect(() => {
  //   if(sessionStatus.value === null) return;
  //   if(sessionStatus.value && (
  //     router.pathname === Routes.login
  //   )) {
  //     router.replace(Routes.home);
  //   } else if(!sessionStatus.value && (
  //     router.pathname === Routes.home
  //   )) {
  //     router.replace(Routes.login);
  //   }
  // }, [ sessionStatus.value, router ]);

  return (
    <Wrapper>
      <Head>
        <Title>Mentorfy</Title>
        <Meta />
      </Head>
      {GlobalStyles()}
      <StoreProvider>
        <ThemeProvider>
          {/* <HeaderPartial /> */}
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
        </ThemeProvider>
      </StoreProvider>
      {/* <LoadingPartial /> */}
    </Wrapper>
  );
};

export default App;
