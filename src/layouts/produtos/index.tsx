import { FC, useState } from 'react';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import { OptionsWrapper } from './styles';

const Produtos: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const Header = (
    <Typography variant='h6'>
      Meus Produtos
    </Typography>
  );

  const SupportHeader = (
    <TabWrapper value={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Meus produtos" />
      <TabItem label="Minhas co-produções" />
    </TabWrapper>
  );
  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}>
        <OptionsWrapper>
          <Button variant="outlined" color="primary">Criar novo produto</Button>
        </OptionsWrapper>
      </MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default Produtos;
