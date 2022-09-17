import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';

const Dashboard: FC<PageTypes.Props> = () => {
  const Header = (
    <Typography variant="h6" noWrap component="div">
      Minha Evolução
    </Typography>
  );

  return (
    <PageWrapper>
      <MiniDrawer header={Header}></MiniDrawer>
    </PageWrapper>
  );
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
