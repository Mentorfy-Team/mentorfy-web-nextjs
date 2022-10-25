import { useCallback, useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SupabaseWithouAuth } from '~/backend/supabase';
import createEmotionCache from '~/createEmotionCache';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();

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

const URLSearchParams2JSON_1 = (str: string) => {
  const searchParams = new URLSearchParams(str);
  return Object.fromEntries([...searchParams]);
};

export type RecoveryProps = {
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  type: string;
};

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    if (router.asPath.includes('#')) {
      const recoveryData = URLSearchParams2JSON_1(
        router.asPath.split('#')[1],
      ) as RecoveryProps;

      if (recoveryData.access_token && recoveryData.type == 'magiclink') {
        const { user } = SupabaseWithouAuth.auth.setAuth(
          recoveryData.access_token,
        );
        if (user && router.pathname === '/') {
          router.push('/mentor/dashboard');
        }
      }

      if (recoveryData.type == 'invite') {
        SupabaseWithouAuth.auth.setAuth(recoveryData.access_token);
      }

      if (recoveryData) {
        setParams(recoveryData);
      }
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
                <Component {...pageProps} {...{ urlParams: params }} />
              </Drawer>
            </UserProvider>
          </PageWrapper>
          <LoadingPartial />
        </Wrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
