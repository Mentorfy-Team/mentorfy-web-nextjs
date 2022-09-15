import { useCallback, useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CreateSupabaseWithAuth, SupabaseWithouAuth } from '~/backend/supabase';
import createEmotionCache from '~/createEmotionCache';
import { userStore } from '~/stores';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './_app.styles';
const clientSideEmotionCache = createEmotionCache();

const MiniDrawer = dynamic(() => import('~/components/partials/MiniDrawer'));

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
  const { setProfile } = userStore();

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

  useEffect(() => {
    console.log('eventssss');
    const { data: listener } = SupabaseWithouAuth.auth.onAuthStateChange(
      async (event, session) => {
        console.log('event', event);
        fetch('/api/auth/cookies', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        });

        try {
          const supabase = CreateSupabaseWithAuth(
            null,
            supabaseClient.auth.session()['access_token'],
          );
          const { user } = await supabase.auth.api.getUser(
            supabaseClient.auth.session()['access_token'],
          );

          const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('id', user.id)
            .single();

          if (!error) {
            setProfile(data as any);
          }
        } catch {}
      },
    );

    return listener.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderWithLayout = useCallback(() => {
    if (!router.pathname.includes('mentor')) {
      return <Component {...pageProps} {...{ urlParams: params }} />;
    }
    return (
      <MiniDrawer profile={(pageProps as any).profile as any}>
        <Component {...pageProps} {...{ urlParams: params }} />
      </MiniDrawer>
    );
  }, [Component, pageProps, params, router.pathname]);

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
            <UserProvider supabaseClient={supabaseClient}>
              <RenderWithLayout />
            </UserProvider>
          </PageWrapper>
        </Wrapper>
      </ThemeProvider>
      {/* <LoadingPartial /> */}
    </CacheProvider>
  );
};

export default App;
