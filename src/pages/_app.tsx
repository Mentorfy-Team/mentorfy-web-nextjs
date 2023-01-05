import { useCallback, useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createEmotionCache from '~/createEmotionCache';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();
import { Corinthia, Roboto } from '@next/font/google';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '~/@types/supabase/v2.types';
import { userStore } from '~/stores';
import SupabaseClient from '~/services/SupabaseClient';
export { reportWebVitals } from 'next-axiom';

export const MainFont = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  variable: '--main-font',
  subsets: ['latin'],
});

export const SingFont = Corinthia({
  weight: ['400', '700'],
  variable: '--sign-font',
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
  const { setLoading, isLoading, llc } = userStore();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  useEffect(() => {
    if (router.asPath.includes('#')) {
      router.replace(router.asPath.replace('#', '?'));
    }
    // find if llc has more than 30 seconds pass
    if (llc && isLoading) {
      const now = new Date();
      const diff = Math.abs(now.getTime() - Date.parse(llc));
      const diffSeconds = Math.ceil(diff / 1000);
      if (diffSeconds > 30) {
        setLoading(false);
      }
    }
  }, [isLoading, llc, router, setLoading]);

  useEffect(() => {
    const {
      data: { subscription },
    } = SupabaseClient().auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          SupabaseClient().auth.setSession(session);
        }
      }
    });

    return subscription.unsubscribe();
  }, []);

  const Drawer = useCallback(
    ({ children }) => {
      if (
        router.pathname.includes('/m') &&
        !router.pathname.includes('mentorado')
      )
        return <MiniDrawer props={props}>{children}</MiniDrawer>;

      return <>{children}</>;
    },
    [router.pathname, props],
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BETA === 'true') {
      router.push('/beta');
    }
  }, [router]);

  useEffect(() => {
    const handleLoadingOn = (url, { shallow }) => {
      setLoading(true);
    };
    const handleLoadingOff = (url, { shallow }) => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleLoadingOn);
    router.events.on('routeChangeComplete', handleLoadingOff);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleLoadingOn);
      router.events.off('routeChangeComplete', handleLoadingOff);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={MainFont.style} className={MainFont.className}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Mentorfy</title>
          <meta content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyles />
        <ThemeProvider>
          <CssBaseline />
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
