import { FC } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';

const Dashboard: FC<PageTypes.Props> = () => {
  return <Toolbar tabs={['Progressão']} />;
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    return {
      props: {},
    };
  },
});

export default Dashboard;
