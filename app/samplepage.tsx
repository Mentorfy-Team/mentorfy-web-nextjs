'use client';

import React, { useEffect, useState } from 'react';
import TextBanner from './components/ColorfulText';
import {
  Background,
  BannerBox,
  DescriptionBox,
  MoreInfo,
  Overlay,
  PlayButton,
  RatingBox,
  Text,
  VideoWrapper,
  VolumeButton,
} from './styles';
import Image from 'next/image';
import Player from './components/Player';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { InfoRounded, PlayArrow } from '@mui/icons-material';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { useProducts } from '~/hooks/useProducts';
import Carousel from './components/Carousel';
import FeaturedModal from './components/FeaturedModal';

const clientProducts = [];

export default function Page() {
  const sizeLg = useMediaQuery('(min-width: 1200px)');
  const sizeMd = useMediaQuery('(min-width: 1024px)');
  const sizeSm = useMediaQuery('(min-width: 426px)');

  const numberOfSlides = sizeLg ? 5 : sizeMd ? 3 : sizeSm ? 2 : 1;

  const [open, setOpen] = useState<boolean>(false);
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [playVideoFade, setPlayVideoFade] = useState<boolean>(false);

  const [currentProduct, setCurrentProduct] = useState<ProductTypes.Product>();
  const [featuredProduct, setFeaturedProduct] =
    useState<Partial<ProductTypes.Product>>();

  const [volume, setVolume] = useState<number>(0);
  const [popularVolume, setPopularVolume] = useState<number>(0);
  const [mainThumb, setMainThumb] = useState<string>('');

  const router = useRouter();

  const { types } = useMemberAreaTypes();

  const { products } = useProducts();
  // const { product: clientProducts } = useGetClientProducts(
  //   user.id,
  //   null,
  // );

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

  const handleOpenFeatured = (product) => {
    if (
      product.relation.approved
      //||product.owner === user.id
    ) {
      router.push(
        types.find((type) => type.id.toString() === product.deliver).path +
          '/' +
          product.id,
      );
    } else {
      handlePopularProductsModal(product);
    }
  };

  return (
    <Background>
      <BannerBox>
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
        <VideoWrapper id="holder">
          <Player
            show={playVideo}
            video={featuredProduct?.video}
            volume={volume}
          />
        </VideoWrapper>
        <Overlay />
        <div
          style={{
            position: 'absolute',
          }}
        >
          <>
            {TextBanner}
            <RatingBox>
              <Rating defaultValue={4.5} precision={0.5} size="small"></Rating>
              <Text>2022</Text>
              <Text>1750 Alunos</Text>
            </RatingBox>
            <DescriptionBox>{featuredProduct?.description}</DescriptionBox>
            <Box display="flex" gap="1rem" mt={3} width="100%">
              <PlayButton
                onClick={() => handleOpenFeatured(featuredProduct)}
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
          </>
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
        withToolBar={false}
      >
        {clientProducts?.length > 0 && (
          <>
            <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
              <Typography variant="h5">Minhas Mentorias</Typography>
            </Box>
          </>
        )}
        <Box sx={{ display: 'flex', margin: '0.5rem 0 0.5rem 0' }}>
          <Typography variant="h5">Populares na Mentorfy</Typography>
        </Box>
        <Carousel
          numSlides={numberOfSlides}
          onClick={(product) => handleOpenFeatured(product)}
          list={products}
        />
        {clientProducts?.length === 0 && <Box height="14rem" />}
      </ContentWidthLimit>
      <FeaturedModal
        open={open}
        setOpen={setOpen}
        banner={currentProduct?.banner_image}
        popularVolume={popularVolume}
        setPopularVolume={setPopularVolume}
        video={currentProduct?.video}
        showVideo={playVideo}
        title={currentProduct?.title}
        currentProduct={currentProduct}
      />
    </Background>
  );
}
