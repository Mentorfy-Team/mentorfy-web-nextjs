import { InfoRounded, PlayArrow } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactPlayer from 'react-player';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import {
  BannerBox,
  MoreInfo,
  Overlay,
  PlayButton,
  VideoHolder,
  VolumeButton,
} from '../../bem-vindo/style';

// import { Container } from './styles';

const BannerFeatured = ({
  playVideoFade,
  mainThumb,
  playVideo,
  featuredProduct,
  volume,
  TextBanner,
  user,
  handlePopularProductsModal,
  setVolume,
}) => {
  const router = useRouter();
  const { types } = useMemberAreaTypes();

  return (
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
        {/* <RatingBox>
          <Rating defaultValue={4.5} precision={0.5} size="small"></Rating>
          <CustomTypography>2022</CustomTypography>
          <CustomTypography>1750 Alunos</CustomTypography>
        </RatingBox> */}
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
            onClick={() => {
              if (
                featuredProduct.relation?.approved ||
                featuredProduct.owner === user.id
              ) {
                router.push(
                  types.find(
                    (type) => type.id.toString() === featuredProduct.deliver,
                  ).path +
                  '/' +
                  featuredProduct.id,
                );
              } else {
                handlePopularProductsModal(featuredProduct);
              }
            }}
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
              src={volume === 0 ? '/svgs/volume-xmark.svg' : '/svgs/volume.svg'}
              alt="volume-icon"
              height={18}
              width={18}
            />
          </VolumeButton>
        </Box>
      </div>
    </BannerBox>
  );
};

export default BannerFeatured;
