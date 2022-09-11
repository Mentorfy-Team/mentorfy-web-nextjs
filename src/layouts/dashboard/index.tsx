import { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';

const Dashboard: FC = () => {
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

  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}></MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default Dashboard;
