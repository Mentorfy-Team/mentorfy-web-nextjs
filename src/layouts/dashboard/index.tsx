import { FC } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';

const Dashboard: FC = () => {

  const Header = (
    <Typography variant="h6" noWrap component="div">
      Dashboard
    </Typography>
  );

  const SupportHeader = (
    <Tabbar value={0}>
      <>
        <Tab label="Desempenho" />
        <Tab label="Notificações" />
      </>
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
