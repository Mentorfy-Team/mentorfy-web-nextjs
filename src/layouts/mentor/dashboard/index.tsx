import { FC, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import { ImagesBox } from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import Soon from '~/components/atoms/Soon';
import { GetProfileById } from '~/backend/repositories/user/GetProfileById';
import { SupabaseServer } from '~/backend/supabase';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import TipBar from '~/components/modules/TipBar';
import { isExpired } from '~/helpers/IsExpired';
import Link from 'next/link';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import isReadOnly from '~/helpers/IsReadOnly';

const WelcomeHeader = dynamic(() => import('./components/welcome-header'), {
  ssr: false,
});

const Dashboard: FC<PageTypes.Props> = ({ user, profile }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  // useEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  //   setHeight(ref.current.offsetHeight);
  // }, []);

  return (
    <>
      <ContentWidthLimit
        withToolBar={false}
        withoutScroll={true}
        maxWidth={1900}
      >
        {isExpired(profile?.expiration_date) && (
          <TipBar
            sx={{
              marginBottom: '1rem',
            }}
            error
          >
            <span>Atenção:</span> Sua assinatura está expirada, para continuar a
            usar a plataforma atualize agora{' '}
            <Link href="/mentor/meu-perfil?tab=2">clicando aqui</Link>.
          </TipBar>
        )}
        <WelcomeHeader disabled={isMobile} name={profile?.name} />
        <Indicators />
        <Finances />
        <Box
          sx={{
            marginTop: '1.2rem',
            display: 'flex',
            gap: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          <ImagesBox>
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={310}
              height={282}
              style={{
                objectFit: 'contain',
              }}
              src="/images/schedule.png"
            />
          </ImagesBox>
          <ImagesBox>
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={302}
              height={284}
              style={{
                objectFit: 'contain',
              }}
              src="/images/basic-info.png"
            />
          </ImagesBox>
          <Box
            sx={{
              width: '456px',
              height: '282px',
              cursor: 'pointer',
              flex: 1,
              position: 'relative',
            }}
          >
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={490}
              height={285}
              style={{
                objectFit: 'contain',
              }}
              src="/images/income.png"
            />
          </Box>
          <Box sx={{ flex: 1 }} />
        </Box>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  const supabase = SupabaseServer(ctx.req, ctx.res);
  const userData = await GetProfileById(supabase, {
    id: session.user.id,
  });

  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      user: session.user,
      profile: userData.profile,
      readOnly,
    },
  };
};

export default Dashboard;
