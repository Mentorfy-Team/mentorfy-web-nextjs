import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import MembersAreaTable from './components/MembersAreaTable';

const MembersArea: FC = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {}, []);

  const Header = (
    <Typography variant="h6" color="white" noWrap component="p">
      Áreas de Membros
    </Typography>
  );

  const SupportHeader = <Box height={16} />;

  const ProductsTableComponent = useCallback(() => {
    return <MembersAreaTable />;
  }, []);

  return (
    <>
      <CustomAppBar id="AppBar">
        {Header} {SupportHeader}
      </CustomAppBar>
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
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}
export default MembersArea;
