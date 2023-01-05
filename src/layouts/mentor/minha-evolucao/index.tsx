import Image from 'next/image';
import { FC } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import Trilha from '~/../public/images/jornada/trilha-jornada';
import { SvgWrapper } from './styles';
import { SupabaseServer } from '~/backend/supabase';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import isReadOnly from '~/helpers/IsReadOnly';
const Dashboard: FC<PageTypes.Props> = () => {
  return (
    <>
      <Toolbar tabs={['Progressão']} />
      <ContentWidthLimit maxWidth={1200} sx={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <Trilha width={1100} height={600} fill="gray" />
        </div>
        <SvgWrapper>
          <Trilha width={1100} height={600} />
        </SvgWrapper>
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/FUJI.png"
          style={{ position: 'absolute' }}
        />
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/KILIMANJARO.png"
          style={{ position: 'absolute' }}
        />
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/OLIMPO.png"
          style={{ position: 'absolute' }}
        />
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/EVEREST.png"
          style={{ position: 'absolute' }}
        />
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/K2.png"
          style={{ position: 'absolute' }}
        />
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
  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      accesses,
      readOnly,
    },
  };
};

export default Dashboard;
