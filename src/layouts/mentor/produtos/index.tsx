import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

import dynamic from 'next/dynamic';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import ProductsTable from './components/ProductsTable';
import { AddProductButton, HeaderWrapper } from './styles';
import plus_svg from '~/../public/svgs/plus';

const CreateProductDialog = dynamic(
  () => import('./components/CreateProductDialog'),
);

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
