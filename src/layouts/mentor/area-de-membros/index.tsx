import { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { useMemberAreas } from '~/hooks/useMemberAreas';
import { GetProfile } from '~/services/profile.service';
import MembersAreaTable from './components/MembersAreaTable';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { memberAreas } = useMemberAreas(user.id);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const ProductsTableComponent = useCallback(() => {
    return <MembersAreaTable rows={memberAreas} />;
  }, [memberAreas]);

  return (
    <>
      <Toolbar tabs={['Áreas ativas']} />
      <Box sx={{ paddingTop: '2rem' }}>
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
      </Box>
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
