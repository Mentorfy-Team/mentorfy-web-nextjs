import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SupabaseWithoutAuth } from '~/backend/supabase';
import createEmotionCache from '~/createEmotionCache';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();
import { Roboto } from '@next/font/google';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '~/@types/supabase/v2.types';

export const MainFont = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  variable: '--main-font',
  subsets: ['latin'],
});

const beta = process.env.NEXT_PUBLIC_BETA;

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

  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  useLayoutEffect(() => {
    if (router.asPath.includes('#')) {
      router.replace(router.asPath.replace('#', '?'));
    }
  }, [router]);

  useEffect(() => {
    const {
      data: { subscription },
    } = SupabaseWithoutAuth.auth.onAuthStateChange((event, session) => {
      fetch('/api/auth/cookies', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      });
    });

    return subscription.unsubscribe();
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

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BETA === 'true') {
      router.push('/beta');
    }
  }, [router]);

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
              <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
              >
                {router.asPath.includes('/m') && <HeaderPartial />}
                {(!beta ||
                  beta === 'false' ||
                  router.asPath.includes('beta')) && (
                  <Drawer>
                    <Component {...pageProps} />
                  </Drawer>
                )}
              </SessionContextProvider>
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
