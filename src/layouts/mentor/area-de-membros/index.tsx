import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { useMemberAreas } from '~/hooks/useMemberAreas';
import { GetProfile } from '~/services/profile.service';
import MembersAreaTable from './components/MembersAreaTable';
import { HeaderWrapper } from './styles';

const MembersArea: FC<PageTypes.Props> = ({ profile, user }) => {
  const { memberAreas } = useMemberAreas(user.id);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {}, []);

  const Header = (
    <HeaderWrapper>
      <Typography variant="h6">Áreas de Membros</Typography>
    </HeaderWrapper>
  );

  const ProductsTableComponent = useCallback(() => {
    return <MembersAreaTable rows={memberAreas} />;
  }, [memberAreas]);

  return (
    <>
      <PageWrapper>
        <MiniDrawer profile={profile} header={Header}>
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

export default MembersArea;
