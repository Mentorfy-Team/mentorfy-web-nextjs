import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';

const Dashboard: FC<PageTypes.Props> = () => {
  const Header = (
    <Typography variant="h6" noWrap component="div">
      Faturamento
    </Typography>
  );

  return <Toolbar tabs={['Geral']} />;
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
