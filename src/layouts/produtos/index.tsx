import { FC, useState } from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import {
  Datagrid,
  MiniDrawer,
  PageWrapper,
  TabItem,
  Tabbar,
} from '~/components';
import ProductsTable from './ProductsTable';
import { mockUsers } from './ProductsTable/mock';
import { AddProductButton, HeaderWrapper } from './styles';
import { plus_svg } from '~/../public/svgs';

const Produtos: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const Header = (
    <HeaderWrapper>
      <Typography variant="h6">Produtos</Typography>
      <Box ml={4}>
        <AddProductButton variant="contained" color="primary">
          <SvgIcon sx={{ paddingTop: '0.4rem' }} component={plus_svg} />
          Criar produto
        </AddProductButton>
      </Box>
    </HeaderWrapper>
  );

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Meus produtos" />
      <TabItem label="Minhas co-produções" />
    </Tabbar>
  );
  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}>
        <Datagrid/>
        <Box sx={{ width: '100%', textAlign: '-webkit-center' }}>
          <Datagrid data={mockUsers(300)} columns={ProductsTable()} />
        </Box>
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
