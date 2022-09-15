import { FC, useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import { WrapperSupportHeader } from '~/components/partials/MiniDrawer/components/SupportHeader';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';

type Props = {
  user: UserClient.User;
  profile: UserClient.Profile;
  accessToken: string;
};

const Dashboard: FC<Props> = ({ profile }) => {
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

  return (
    <CustomAppBar id="AppBar">
      <Toolbar>{Header}</Toolbar>
      {SupportHeader && (
        <WrapperSupportHeader>{SupportHeader}</WrapperSupportHeader>
      )}
    </CustomAppBar>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const profile = await GetProfile(ctx.req);
    return {
      props: {
        profile: null,
      },
    };
  },
});

export default Dashboard;
