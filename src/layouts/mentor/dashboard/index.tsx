import { FC } from 'react';
import Box from '@mui/material/Box';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import { ImagesBox } from './styles';

const Dashboard: FC<PageTypes.Props> = () => {
  return (
    <>
      <Toolbar tabs={['Visão Geral']} />
      <ContentWidthLimit maxWidth={1200}>
        <Box>
          <Image alt='banner' width={1120} height={300} src='/images/banner.png' />
        </Box>
        <Indicators />
        <Finances />
        <Box sx={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between'}}>
          <ImagesBox>
            <Image alt='banner' width={310} height={342} src='/images/schedule.png' />
          </ImagesBox>
          <ImagesBox>
            <Image alt='banner' width={302} height={284} src='/images/basic-info.png' />
          </ImagesBox>
          <Box sx={{width: '456px', height: '254px', cursor: 'pointer'}}>
            <Image alt='banner' width={456} height={254} src='/images/income.png' />
          </Box>
        </Box>
      </ContentWidthLimit>
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

export default Dashboard;
