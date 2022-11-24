import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import { ImagesBox } from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
const Dashboard: FC<PageTypes.Props> = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <>
      <ContentWidthLimit
        withToolBar={false}
        withoutScroll={true}
        maxWidth={1900}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: '25vh',
            overflow: 'hidden',
            position: 'relative',
          }}
          ref={ref}
        >
          <Image
            alt="banner"
            width={width}
            height={height}
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
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
};

export default Dashboard;
