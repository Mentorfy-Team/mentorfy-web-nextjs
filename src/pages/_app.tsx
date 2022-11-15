import { useCallback, useEffect, useLayoutEffect } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SupabaseWithouAuth } from '~/backend/supabase';
import createEmotionCache from '~/createEmotionCache';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();
import { Roboto } from '@next/font/google';

export const MainFont = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--main-font',
  subsets: ['latin'],
});

const LoadingPartial = dynamic(
  () => import('~/components/partials/loading/loading.partial'),
);
const MiniDrawer = dynamic(() => import('~/components/partials/MiniDrawer'));
const HeaderPartial = dynamic(
  () => import('~/components/partials/HeaderPartial'),
);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useLayoutEffect(() => {
    if (router.asPath.includes('#')) {
      router.replace(router.asPath.replace('#', '?'));
    }
  }, [router]);

  useEffect(() => {
    const { data } = SupabaseWithouAuth.auth.onAuthStateChange(
      (event, session) => {
        fetch('/api/auth/cookies', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        });
      },
    );

    return data.unsubscribe();
  }, []);

  const Drawer = useCallback(
    ({ children }) => {
      if (
        router.pathname.includes('/m') &&
        !router.pathname.includes('mentorado')
      )
        return <MiniDrawer>{children}</MiniDrawer>;

      return <>{children}</>;
    },
    [router.pathname],
  );

  return (
    <main className={MainFont.className}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Mentorfy</title>
          <meta content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyles />
        <CssBaseline />
        <ThemeProvider>
          <Wrapper id="WrapperRoot">
            <PageWrapper>
              <UserProvider supabaseClient={supabaseClient}>
                {router.asPath.includes('/m') && <HeaderPartial />}
                <Drawer>
                  <Component {...pageProps} />
                </Drawer>
              </UserProvider>
            </PageWrapper>
            <LoadingPartial />
            <ToastContainer
              theme="dark"
              autoClose={2000}
              hideProgressBar={false}
            />
          </Wrapper>
        </ThemeProvider>
      </CacheProvider>
    </main>
  );
};

export default App;
