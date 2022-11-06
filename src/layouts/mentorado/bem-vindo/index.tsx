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
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
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
  CollorFullPopular,
  CollorFullTypography,
  CourseBox,
  CustomTypography,
  MoreInfo,
  Overlay,
  OverlayPopular,
  PlayButton,
  PopularButton,
  PopularProductDescription,
  ProductTitle,
  RatingBox,
  VideoHolder,
  VolumeButton,
} from './style';

const BemVindo: FC<PageTypes.Props> = ({ user }) => {
  const sizeLg = useMediaQuery('(min-width: 1200px)');
  const sizeMd = useMediaQuery('(min-width: 1024px)');
  const sizeSm = useMediaQuery('(min-width: 426px)');

  const numberOfSlides = sizeLg ? 5 : sizeMd ? 3 : sizeSm ? 2 : 1;

  const [currentProduct, setCurrentProduct] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [playVideoFade, setPlayVideoFade] = useState<boolean>(false);
  const [featuredProduct, setFeaturedProduct] =
    useState<Partial<ProductTypes.Product>>();
  const [volume, setVolume] = useState<number>(0);
  const [popularVolume, setPopularVolume] = useState<number>(0);
  const [mainThumb, setMainThumb] = useState<string>('');
  const router = useRouter();

  const { types } = useMemberAreaTypes();
  const { products } = useProducts();
  const { product: clientProducts } = useGetClientProducts(user.id);

  const TextBanner = (
    <Box
      sx={{
        maxWidth: '16.5rem',
        textAlign: 'start',
        marginTop: '-3rem',
        marginBottom: '1rem',
      }}
    >
      <CollorFullTypography
        one={featuredProduct?.extra?.titleGradiente?.one || 'white'}
        two={featuredProduct?.extra?.titleGradiente?.two || 'white'}
        three={featuredProduct?.extra?.titleGradiente?.three || 'white'}
      >
        {featuredProduct?.title}
      </CollorFullTypography>
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
    let shouldPlay = false;
    const index = clientProducts.findIndex(
      (product) => product?.video || product?.banner_image,
    );
    if (index !== -1) {
      setFeaturedProduct(clientProducts[index]);
      shouldPlay = true;
    } else {
      const index = products.findIndex(
        (product) => product.video || product.banner_image,
      );
      if (index !== -1) {
        setFeaturedProduct(products[index]);
        shouldPlay = true;
      }
    }

    setTimeout(() => {
      if (shouldPlay) setPlayVideoFade(true);
    }, 3000);
    setTimeout(() => {
      if (shouldPlay) setPlayVideo(true);
    }, 2000);
    setTimeout(() => {
      setVolume(0);
    }, 45000);
    setTimeout(() => {
      //setPlayVideo(false);
    }, 60000);
  }, [products, clientProducts]);

  const handlePopularProductsModal = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };
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
          className={(playVideoFade ? 'hide' : '') + ' main_image'}
          src={mainThumb || '/images/banner.png'}
          style={{
            objectFit: 'contain',
            position: 'absolute',
          }}
          height="720"
          width="1920"
          alt="banner"
        />
        <VideoHolder id="holder">
          <ReactPlayer
            id="goto"
            className={(playVideo ? '' : 'hide') + ' video' + ' react-player'}
            url={playVideo ? featuredProduct?.video : ''}
            width="100%"
            loop={true}
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
        <Overlay />
        <div
          style={{
            position: 'absolute',
          }}
        >
          {TextBanner}
          <RatingBox>
            <Rating defaultValue={4.5} precision={0.5} size="small"></Rating>
            <CustomTypography>2022</CustomTypography>
            <CustomTypography>1750 Alunos</CustomTypography>
          </RatingBox>
          <Box
            sx={{
              maxWidth: '37.5rem',
              textAlign: 'start',
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '3',
              'line-clamp': '3',
              '-webkit-box-orient': 'vertical',
            }}
          >
            {featuredProduct?.description}
          </Box>
          <Box display="flex" gap="1rem" mt={3} width="100%">
            <PlayButton
              onClick={() =>
                router.push(
                  types
                    .find(
                      (type) => type.id.toString() === featuredProduct.deliver,
                    )
                    .name.replace(/\s/g, '-')
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase() +
                    '/' +
                    featuredProduct.id,
                )
              }
              variant="outlined"
            >
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
            <VolumeButton
              onClick={() => (volume === 0 ? setVolume(0.5) : setVolume(0))}
            >
              <Image
                src={
                  volume === 0 ? '/svgs/volume-xmark.svg' : '/svgs/volume.svg'
                }
                alt="volume-icon"
                height={18}
                width={18}
              />
            </VolumeButton>
          </Box>
        </div>
      </BannerBox>
      <ContentWidthLimit
        sx={{
          marginTop: sizeLg ? '-6rem' : '0',
          zIndex: 1,
          position: 'relative',
        }}
        maxWidth="100%"
        withoutScroll
      >
        {clientProducts?.length > 0 && (
          <>
            <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
              <Typography variant="h5">Minhas Mentorias</Typography>
            </Box>
            <Slider
              {...settings}
              slidesToShow={numberOfSlides}
              className="container"
            >
              {clientProducts.map((product, index) => (
                <CourseBox
                  onMouseOver={() => {}}
                  className="item"
                  height={400}
                  key={index}
                  onClick={() => {
                    router.push(
                      types
                        .find((type) => type.id.toString() === product.deliver)
                        .name.replace(/\s/g, '-')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase() +
                        '/' +
                        product.id,
                    );
                  }}
                >
                  <Image
                    alt=""
                    src={product?.main_image || '/images/moonlit.png'}
                    width={400}
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
                  numberOfSlides -
                    (clientProducts.length > numberOfSlides
                      ? numberOfSlides
                      : clientProducts.length),
                ),
              ].map((_, i) => (
                <CourseBox
                  onMouseOver={() => {}}
                  className="item"
                  height={sizeLg ? '400px' : 'unset'}
                  width={sizeLg ? '300px' : 'unset'}
                  key={i}
                />
              ))}
            </Slider>
          </>
        )}
        <Box sx={{ display: 'flex', margin: '0.5rem 0 0.5rem 0' }}>
          <Typography variant="h5">Populares na Mentorfy</Typography>
        </Box>
        <Slider
          {...settings}
          slidesToShow={numberOfSlides}
          className="container"
        >
          {products
            .filter((p) => p.banner_image)
            .map((product, index) => (
              <CourseBox
                onMouseOver={() => {}}
                className="item"
                height={sizeLg ? '190px' : 'unset'}
                width={sizeLg ? '350px' : 'unset'}
                key={index}
                onClick={() => handlePopularProductsModal(product)}
              >
                <Image
                  alt=""
                  src={product?.banner_image || '/images/moonlit.png'}
                  width={400}
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
          {products?.filter((p) => p.banner_image)?.length < numberOfSlides &&
            [
              ...Array(
                numberOfSlides - products.filter((p) => p.banner_image)?.length,
              ),
            ].map((_, i) => <div key={i} />)}
        </Slider>
        {clientProducts?.length === 0 && <Box height="14rem" />}
      </ContentWidthLimit>
      <ModalComponent
        id="modal_destaque"
        open={open}
        setOpen={setOpen}
        popularProduct
        isMentorado
      >
        <ModalDialogContent popularProduct isMentorado>
          <>
            <VideoHolder id="holder">
              {currentProduct.video ? (
                <ReactPlayer
                  id="goto"
                  className={
                    (playVideo ? '' : 'hide') +
                    ' video' +
                    ' react-player-popular'
                  }
                  url={playVideo ? currentProduct?.video : ''}
                  width="100%"
                  loop={true}
                  height="100%"
                  playing={true}
                  controls={false}
                  volume={popularVolume}
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
              ) : (
                <Image
                  alt=""
                  src={currentProduct.banner_image}
                  width={800}
                  height={300}
                  style={{
                    objectFit: 'cover',
                  }}
                  quality={100}
                />
              )}
              <OverlayPopular />
            </VideoHolder>
          </>
          <Box
            sx={{
              maxWidth: '100%',
              textAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              margin: '-4rem 1rem 1rem 1rem',
              position: 'relative',
              gap: '0.5rem',
            }}
          >
            <Box
              sx={{
                textAlign: 'start',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <CollorFullPopular
                one={currentProduct?.extra?.titleGradiente?.one || 'white'}
                two={currentProduct?.extra?.titleGradiente?.two || 'white'}
                three={currentProduct?.extra?.titleGradiente?.three || 'white'}
              >
                {currentProduct.title}
              </CollorFullPopular>
              <VolumeButton
                onClick={() =>
                  popularVolume === 0
                    ? setPopularVolume(0.5)
                    : setPopularVolume(0)
                }
              >
                <Image
                  src={
                    popularVolume === 0
                      ? '/svgs/volume-xmark.svg'
                      : '/svgs/volume.svg'
                  }
                  alt="volume-icon"
                  height={18}
                  width={18}
                />
              </VolumeButton>
            </Box>
            <PopularProductDescription>
              {currentProduct.description}
            </PopularProductDescription>
            <PopularButton variant="outlined">Comprar</PopularButton>
          </Box>
        </ModalDialogContent>
      </ModalComponent>
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
