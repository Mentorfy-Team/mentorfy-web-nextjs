import { FC } from 'react';
import { MiniDrawer, PageWrapper } from '~/components';

const Dashboard: FC = () => {
  return (
    <PageWrapper>
      <MiniDrawer Title="Dashboard"></MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default Dashboard;
