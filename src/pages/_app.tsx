import { type } from 'os';
import { useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import createEmotionCache from '~/createEmotionCache';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const URLSearchParams2JSON_1 = (str: string) => {
  var searchParams = new URLSearchParams(str);
  return Object.fromEntries([...searchParams]);
};

export type RecoveryProps = {
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
};

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    if (router.asPath.includes('#') && router.asPath.includes('recovery')) {
      const recoveryData = URLSearchParams2JSON_1(
        router.asPath.split('#')[1],
      ) as RecoveryProps;

      if (recoveryData) {
        setParams(recoveryData);
      }
    }
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mentorfy</title>
        <meta content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyles />
      <CssBaseline />
      <ThemeProvider>
        {/* <HeaderPartial /> */}
        <Wrapper id="WrapperRoot">
          <PageWrapper>
            <Component {...pageProps} {...{ urlParams: params }} />
          </PageWrapper>
        </Wrapper>
      </ThemeProvider>
      {/* <LoadingPartial /> */}
    </CacheProvider>
  );
};

export default App;
