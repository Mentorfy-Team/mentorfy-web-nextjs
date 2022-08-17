import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as StoreProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from '~/createEmotionCache';
import { AppStore, UserStore } from '~/stores';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useHydrateAtoms([[UserStore.state, {}]] as const);
  useHydrateAtoms([[AppStore.state, {}]] as const);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Mentorfy</title>
        <meta content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyles />
      <StoreProvider>
        <ThemeProvider>
          {/* <HeaderPartial /> */}
          <CssBaseline />
          <Wrapper>
            <PageWrapper>
              <Component {...pageProps} />
            </PageWrapper>
          </Wrapper>
        </ThemeProvider>
      </StoreProvider>
      {/* <LoadingPartial /> */}
    </CacheProvider>
  );
};

export default App;
