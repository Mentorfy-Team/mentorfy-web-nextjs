import { FC } from 'react';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import Finances from './components/finance';
import Indicators from './components/Indicators';

const Dashboard: FC<PageTypes.Props> = () => {
  return (
    <>
      <Toolbar tabs={['Visão Geral']} />
      <ContentWidthLimit maxWidth={1200}>
        <Image alt='banner' width={1120} height={300} src='/images/banner.png' />

        <Indicators/>
        <Finances/>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);
    return {
      props: {
        profile: profile,
      },
    };
  },
});

export default Dashboard;
