import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FC, useEffect, useState } from 'react';
import InfoRounded from '@mui/icons-material/InfoRounded';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const Slider: any = dynamic(() => import('react-slick'), { ssr: false });
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { PublicRoutes } from '~/consts';
import { useGetClientProducts } from '~/hooks/useGetClientProducts';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import {
  AbsoluteBottomBox,
  AbsoluteTopBox,
  Background,
  BannerBox,
  CollorFullMentorfy,
  CollorFullTypography,
  CourseBox,
  CustomTypography,
  MoreInfo,
  PlayButton,
  ProductTitle,
  RatingBox,
  VideoHolder,
} from './style';

const BemVindo: FC<PageTypes.Props> = ({ user }) => {
  const isDesktop = useMediaQuery('(min-width: 600px)');

  const [mainVideo, setMainVideo] = useState<string>('');
  const [volume, setVolume] = useState<number>(0);
  const [mainThumb, setMainThumb] = useState<string>('');
  const router = useRouter();

  const { types } = useMemberAreaTypes();
  const { products } = useProducts();
  const { product: clientProducts } = useGetClientProducts(user.id);

  const TextBanner = (
    <Box sx={{ maxWidth: '16.5rem', height: '8rem', textAlign: 'start' }}>
      <CollorFullTypography>The World´s Storytelling</CollorFullTypography>
    </Box>
  );

  const settings = {
    dots: true,
    speed: 1000,
    slidesToScroll: 1,
    nextArrow: <div className="arrow__btn left-arrow">‹</div>,
    prevArrow: <div className="arrow__btn right-arrow">›</div>,
  };

  useEffect(() => {
    setTimeout(() => {
      setMainVideo('https://www.youtube.com/embed/vlWBa7iqEZg');
    }, 4000);
    setTimeout(() => {
      setVolume(0.5);
    }, 6000);
    setTimeout(() => {
      setMainVideo(null);
    }, 43000);
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
        <Box display="flex" gap="1rem">
          <PlayButton variant="outlined">
            <PlayArrow />
            Entrar
          </PlayButton>
          <MoreInfo variant="outlined">
            <InfoRounded
              sx={{
                marginRight: '0.5rem',
              }}
            />
            Mais Informações
          </MoreInfo>
        </Box>
        <Box height="2rem" />
      </BannerBox>
      <ContentWidthLimit
        sx={{
          marginTop: isDesktop ? '-6rem' : '0',
          zIndex: 1,
          position: 'relative',
        }}
        maxWidth="100%"
        withoutScroll
      >
        {/* // TODO: fix 'Meus estudos' margin-top when it´s mobile */}
        <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
          <Typography variant="h5">Minhas Mentorias</Typography>
        </Box>
        <Slider {...settings} slidesToShow={5} className="container">
          {clientProducts.map((product, index) => (
            <CourseBox
              onMouseOver={() => {}}
              className="item"
              height={isDesktop ? '400px' : 'unset'}
              width={isDesktop ? '300px' : 'unset'}
              key={index}
              onClick={() =>
                router.push(
                  types
                    .find(
                      (type) =>
                        type.id === (product.member_area as any).type_id,
                    )
                    .name.toLowerCase() +
                    '/' +
                    product.id,
                )
              }
            >
              <Image
                alt=""
                src={product?.main_image || '/images/moonlit.png'}
                width={350}
                height={400}
                style={{
                  objectFit: 'cover',
                }}
                quality={100}
              />
              <AbsoluteTopBox>
                <CollorFullMentorfy>
                  Mentor<span>fy</span>
                </CollorFullMentorfy>
              </AbsoluteTopBox>
              {!product?.banner_image && (
                <AbsoluteBottomBox>
                  <ProductTitle>{product?.title}</ProductTitle>
                </AbsoluteBottomBox>
              )}
            </CourseBox>
          ))}
          {[
            ...Array(
              5 - (clientProducts.length > 5 ? 5 : clientProducts.length),
            ),
          ].map((_, i) => (
            <CourseBox
              onMouseOver={() => {}}
              className="item"
              height={isDesktop ? '400px' : 'unset'}
              width={isDesktop ? '300px' : 'unset'}
              key={i}
            />
          ))}
        </Slider>
        <Box sx={{ display: 'flex', margin: '0rem 0 0.5rem 0' }}>
          <Typography variant="h5">Populares na Mentorfy</Typography>
        </Box>
        <Slider {...settings} slidesToShow={5} className="container">
          {products.map((product, index) => (
            <CourseBox
              onMouseOver={() => {}}
              className="item"
              minWidth={350}
              key={index}
            >
              <Image
                alt=""
                src={product?.banner_image || '/images/moonlit.png'}
                width={350}
                height={190}
                style={{
                  objectFit: 'cover',
                }}
                quality={100}
              />
              <AbsoluteTopBox>
                <CollorFullMentorfy>
                  Mentor<span>fy</span>
                </CollorFullMentorfy>
              </AbsoluteTopBox>
              {!product.banner_image && (
                <AbsoluteBottomBox>
                  <ProductTitle>{product.title}</ProductTitle>
                </AbsoluteBottomBox>
              )}
            </CourseBox>
          ))}
          {products?.length < 5 &&
            [...Array(5 - products?.length)].map((_, i) => <div key={i} />)}
        </Slider>
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
