import React from 'react';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { VideoWrapper, VolumeButton } from '../../styles';
import Player from '../Player';
import Image from 'next/image';
import {
  Colorful,
  OverlayPopular,
  PopularButton,
  PopularProductDescription,
} from './styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  video: string;
  showVideo: boolean;
  popularVolume: number;
  banner?: string;
  title?: string;
  currentProduct?: ProductTypes.Product;
  setPopularVolume: (value: number) => void;
};

const FeaturedModal: React.FC<Props> = ({
  open,
  setOpen,
  video,
  showVideo,
  popularVolume,
  setPopularVolume,
  banner,
  title,
  currentProduct,
}) => {
  return (
    <ModalComponent
      id="modal_destaque"
      open={open}
      setOpen={setOpen}
      popularProduct
    >
      <ModalDialogContent popularProduct>
        <>
          <VideoWrapper id="holder">
            {video ? (
              <Player show={showVideo} volume={popularVolume} video={video} />
            ) : (
              <Image
                alt=""
                src={banner ?? '/images/moonlit.png'}
                width={1200}
                height={720}
                style={{
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                quality={100}
              />
            )}
            <OverlayPopular />
          </VideoWrapper>
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
            <Colorful one={'white'} two={'white'} three={'white'}>
              {title}
            </Colorful>
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
            {currentProduct?.description}
          </PopularProductDescription>
          {currentProduct?.relation ? (
            <>
              <PopularButton variant="outlined" onClick={() => setOpen(false)}>
                Fechar
              </PopularButton>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  alignSelf: 'self-end',
                }}
              >
                <div
                  style={{
                    height: '6px',
                    width: '6px',
                    backgroundColor: '#00A3FF',
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  sx={{
                    color: '#00A3FF',
                  }}
                >
                  Aguardando aprovação do acesso.
                </Typography>
              </div>
            </>
          ) : (
            <PopularButton variant="outlined" onClick={() => setOpen(false)}>
              Comprar
            </PopularButton>
          )}
        </Box>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default FeaturedModal;
