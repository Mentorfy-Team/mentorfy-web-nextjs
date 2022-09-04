import { FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Unstable_Grid2 as Grid,
  SvgIcon,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  ContentWidthLimit,
  MiniDrawer,
  PageWrapper,
  SearchInput,
  TabItem,
  Tabbar,
} from '~/components';
import CreateProductDialog from './components/CreateProductDialog';
import ProductsTable from './components/ProductsTable';
import { AddProductButton, HeaderWrapper } from './styles';
import { plus_svg } from '~/../public/svgs';

const Produtos: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const [products, setProducts] = useState([]);
  const [openCreatePage, setOpenCreatePage] = useState(false);

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
    <>
      <PageWrapper>
        <MiniDrawer header={Header} supportHeader={SupportHeader}>
          <ContentWidthLimit>
            <Grid container>
              <Grid xs={12} lg={6}>
                <Box sx={{ float: 'left' }}>
                  <SearchInput
                    sx={{
                      width: isMobile ? '90vw' : 'unset',
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={12} lg={6}>
                <AddProductButton
                  sx={{
                    float: 'right',
                    marginTop: isMobile ? '1rem' : '0px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenCreatePage(true)}
                >
                  <SvgIcon sx={{ paddingTop: '0.4rem' }} component={plus_svg} />
                  Criar produto
                </AddProductButton>
              </Grid>
            </Grid>
            <ProductsTableComponent />
          </ContentWidthLimit>
        </MiniDrawer>
      </PageWrapper>
      <CreateProductDialog open={openCreatePage} setOpen={setOpenCreatePage} />
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default Produtos;
