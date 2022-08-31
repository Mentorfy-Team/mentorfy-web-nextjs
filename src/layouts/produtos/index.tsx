import { FC, useState } from 'react';
<<<<<<< HEAD
import { Box, SvgIcon, Tab, Typography } from '@mui/material';
import { Datagrid, MiniDrawer, PageWrapper, TabItem, Tabbar } from '~/components';
import { AddProductButton, HeaderWrapper, OptionsWrapper } from './styles';
=======
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
>>>>>>> 945a4dbf2d3ac48c0725e572e3e139a1598299ed
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
<<<<<<< HEAD
        <Datagrid/>
=======
        <Box sx={{ width: '100%', textAlign: '-webkit-center' }}>
          <Datagrid data={mockUsers(300)} columns={ProductsTable()} />
        </Box>
>>>>>>> 945a4dbf2d3ac48c0725e572e3e139a1598299ed
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
