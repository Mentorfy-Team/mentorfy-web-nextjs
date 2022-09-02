import { FC, useEffect, useState } from 'react';
import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { MiniDrawer, PageWrapper, TabItem, Tabbar } from '~/components';
import ProductsTable from './ProductsTable';
import { AddProductButton, HeaderWrapper, ScrollArea } from './styles';
import { plus_svg } from '~/../public/svgs';

const Produtos: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {}, []);

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
        <Box id="Grid" sx={{ textAlign: '-webkit-center' }}>
          <ScrollArea
            sx={{
              width: isMobile ? '90vw' : '80vw',
              maxWidth: '1120px',
            }}
          >
            <ProductsTable />
          </ScrollArea>
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
