import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import ProductsTable from './components/ProductsTable';
import { AddProductButton } from './styles';
import PlusSvg from '~/../public/svgs/plus';

const CreateProductDialog = dynamic(
  () => import('./components/CreateProductDialog'),
);

const Produtos: FC<PageTypes.Props> = ({ profile, user }) => {
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const { products } = useProducts(user.id);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const ProductsTableComponent = useCallback(() => {
    return <ProductsTable rows={products} />;
  }, [products]);

  return (
    <>
      <Toolbar tabs={['Produtos']} />
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
              variant="outlined"
              color="primary"
              onClick={() => setOpenCreatePage(true)}
            >
              <PlusSvg />
              <Typography variant="body2" ml={1}>
                Criar produto
              </Typography>
            </AddProductButton>
          </Grid>
        </Grid>
        <ProductsTableComponent />
      </ContentWidthLimit>
      <CreateProductDialog open={openCreatePage} setOpen={setOpenCreatePage} />
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);

    return {
      props: {
        profile: profile,
      },
    };
  },
});

export default Produtos;
