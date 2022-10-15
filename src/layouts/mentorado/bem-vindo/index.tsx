import { FC, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { PublicRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import {
  Background,
  BannerBox,
  CollorFullTypography,
  CourseBox,
  CustomTypography,
  RatingBox,
  VideoHolder,
  Videoshow,
} from './style';

const BemVindo: FC<PageTypes.Props> = ({ user }) => {
  const { products } = useProducts(user.id);
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const [mainVideo, setMainVideo] = useState<string>('');
  const [volume, setVolume] = useState<number>(0);
  const [mainThumb, setMainThumb] = useState<string>('');
  const TextBanner = (
    <Box sx={{ maxWidth: '16.5rem', height: '8rem', textAlign: 'start' }}>
      <CollorFullTypography>The World´s Storytelling</CollorFullTypography>
    </Box>
  );
  const videoRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setMainVideo('https://www.youtube.com/embed/vlWBa7iqEZg');
    }, 4000);
    setTimeout(() => {
      setVolume(0.5);
    }, 5000);
    setTimeout(() => {
      setMainVideo(null);
    }, 40000);
  }, []);

  return (
    <Background>
      <BannerBox
        sx={{
          marginTop: '3.1rem',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          className={mainVideo ? 'hide' : ''}
          src="/images/banner.png"
          style={{
            objectFit: 'contain',
            position: 'absolute',
          }}
          height="720"
          width="1920"
          alt="banner"
        />
        <VideoHolder>
          <ReactPlayer
            id="goto"
            className={(mainVideo ? '' : 'hide') + ' video'}
            url={mainVideo}
            width="100%"
            height="100%"
            playing={true}
            controls={false}
            volume={volume}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  autoplay: 1,
                  disablekb: 0,
                },
              },
            }}
          />
        </VideoHolder>

        {TextBanner}
        <RatingBox>
          <Rating defaultValue={4.5} precision={0.5} size="small"></Rating>
          <CustomTypography>2022</CustomTypography>
          <CustomTypography>1750 Alunos</CustomTypography>
        </RatingBox>
        <Box sx={{ maxWidth: '37.5rem', height: '4.2rem', textAlign: 'start' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
          pariatur, doloremque iste corrupti perspiciatis modi, nobis quam
          reprehenderit esse officiis, sequi at exercitationem. Tempora
          architecto dolorem ex laborum, sequi odit?
        </Box>
      </BannerBox>
      <ContentWidthLimit
        sx={{
          marginTop: isDesktop ? '-6rem' : '0',
          zIndex: 1,
          position: 'relative',
        }}
        maxWidth="100%"
      >
        {/* // TODO: fix 'Meus estudos' margin-top when it´s mobile */}
        <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
          <Typography variant="h5">Trending Now</Typography>
        </Box>
        <Videoshow className="container">
          {products &&
            products.map((product) => (
              <CourseBox
                onMouseOver={() => console.log('isFocusing')}
                className="item"
                minWidth={350}
                key={product.id}
              >
                <Image
                  alt=""
                  src={product.banner_image}
                  width={350}
                  height={190}
                  style={{
                    objectFit: 'cover',
                  }}
                  quality={100}
                />
              </CourseBox>
            ))}
        </Videoshow>
        <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
          <Typography variant="h5">Populares na Mentorfy</Typography>
        </Box>
        <Videoshow className="container">
          {products &&
            products.map((product) => (
              <CourseBox className="item" minWidth={350} key={product.id}>
                <Image
                  alt=""
                  src={product.banner_image}
                  width={350}
                  height={190}
                  style={{
                    objectFit: 'cover',
                  }}
                  quality={100}
                />
              </CourseBox>
            ))}
        </Videoshow>
      </ContentWidthLimit>
    </Background>
  );
};

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

export default BemVindo;
