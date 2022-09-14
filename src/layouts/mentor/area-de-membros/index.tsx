import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

import dynamic from 'next/dynamic';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import MembersAreaTable from './components/MembersAreaTable';
import { AddProductButton, HeaderWrapper } from './styles';
import plus_svg from '~/../public/svgs/plus';

const MembersArea: FC = () => {
  const [products, setProducts] = useState([]);
  const [openCreatePage, setOpenCreatePage] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {}, []);

  const Header = (
    <HeaderWrapper>
      <Typography variant="h6">Áreas de Membros</Typography>
    </HeaderWrapper>
  );

  const ProductsTableComponent = useCallback(() => {
    return <MembersAreaTable />;
  }, []);

  return (
    <>
      <PageWrapper>
        <MiniDrawer header={Header}>
          <ContentWidthLimit>
            <Box sx={{ float: 'left', width: '30%' }}>
              <SearchInput
                sx={{
                  width: isMobile ? '90vw' : 'unset',
                }}
              />
            </Box>
            <ProductsTableComponent />
          </ContentWidthLimit>
        </MiniDrawer>
      </PageWrapper>
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}
export default MembersArea;
