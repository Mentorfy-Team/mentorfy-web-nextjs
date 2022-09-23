import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import DragNDrop from '~/components/modules/DragNDrop';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';

const Dashboard: FC<PageTypes.Props> = ({ profile }) => {
  const [tabindex, setTabindex] = useState(0);
  const Header = (
    <Typography variant="h6" noWrap component="div">
      Dashboard
    </Typography>
  );

  const SupportHeader = (
    <Tabbar onChange={(_, value) => setTabindex(value)} selected={tabindex}>
      <TabItem label="Desempenho" />
      <TabItem label="Notificações" />
    </Tabbar>
  );

  useEffect(() => {
    // const LoadClientsService = async () => {
    //   const response = await HttpClient.get(ApiRoutes.users_profile);
    // };
    //LoadClientsService();
  }, []);

  return <PageWrapper></PageWrapper>;
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
