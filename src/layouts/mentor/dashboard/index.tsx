import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import { WrapperSupportHeader } from '~/components/partials/MiniDrawer/components/SupportHeader';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';

type Props = {
  user: UserClient.User;
  profile: UserClient.Profile;
  accessToken: string;
};

const Dashboard: FC<Props> = ({ profile }) => {
  const [tabindex, setTabindex] = useState(0);

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
      <Typography variant="h6" color="white" noWrap component="p">
        Dashboard
      </Typography>
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
