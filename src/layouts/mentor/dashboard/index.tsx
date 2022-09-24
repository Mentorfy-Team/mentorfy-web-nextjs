import { FC } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';

const Dashboard: FC<PageTypes.Props> = () => {
  return <Toolbar tabs={['Visão Geral']} />;
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
