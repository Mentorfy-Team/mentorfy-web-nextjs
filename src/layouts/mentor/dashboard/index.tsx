import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/future/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import { ImagesBox } from './styles';
const Dashboard: FC<PageTypes.Props> = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);

    console.log(ref.current.parentElement);
    console.log(ref.current.parentElement.offsetHeight);
    console.log(ref.current.parentElement.offsetWidth);
  }, []);
  return (
    <>
      <Toolbar tabs={['Visão Geral']} />
      <ContentWidthLimit maxWidth={1900}>
        <Box
          sx={{
            width: '100%',
            minHeight: '300px',
            overflow: 'hidden',
            position: 'relative',
          }}
          ref={ref}
        >
          <Image
            alt="banner"
            width={width}
            height={300 * 2}
            src="/images/banner.png"
            style={{
              objectFit: 'cover',
              position: 'absolute',
              bottom: '0px',
            }}
            quality={100}
          />
        </Box>
        <Indicators />
        <Finances />
        <Box
          sx={{
            marginTop: '1.2rem',
            display: 'flex',
            gap: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          <ImagesBox>
            <Image
              alt="banner"
              width={310}
              height={282}
              style={{
                objectFit: 'contain',
              }}
              src="/images/schedule.png"
            />
          </ImagesBox>
          <ImagesBox>
            <Image
              alt="banner"
              width={302}
              height={284}
              style={{
                objectFit: 'contain',
              }}
              src="/images/basic-info.png"
            />
          </ImagesBox>
          <Box
            sx={{
              width: '456px',
              height: '282px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <Image
              alt="banner"
              width={490}
              height={285}
              style={{
                objectFit: 'contain',
              }}
              src="/images/income.png"
            />
          </Box>
          <Box sx={{ flex: 1 }} />
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
