import { FC, useCallback, useEffect, useState } from 'react';
import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { MiniDrawer, PageWrapper, TabItem, Tabbar } from '~/components';
import ProductsTable from './components/ProductsTable';
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
    </HeaderWrapper>
  );

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Meus produtos" />
      <TabItem label="Minhas co-produções" />
    </Tabbar>
  );

  const ProductsTableComponent = useCallback(() => {
    return <ProductsTable />;
  }, []);

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
            <AddProductButton
              sx={{
                float: 'right',
                marginTop: '4px',
              }}
              variant="contained"
              color="primary"
            >
              <SvgIcon sx={{ paddingTop: '0.4rem' }} component={plus_svg} />
              Criar produto
            </AddProductButton>
            <ProductsTableComponent />
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
