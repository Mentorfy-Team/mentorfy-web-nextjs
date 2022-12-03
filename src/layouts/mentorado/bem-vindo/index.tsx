import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { ListProducts } from '~/services/product.service';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { useGetClientProducts } from '~/hooks/useGetClientProducts';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { useProducts } from '~/hooks/useProducts';
import {
  AbsoluteBottomBox,
  AbsoluteTopBox,
  Background,
  CollorFullMentorfy,
  CollorFullPopular,
  CollorFullTypography,
  CourseBox,
  OverlayPopular,
  PopularButton,
  PopularProductDescription,
  ProductTitle,
  SliderWrapper,
  VideoHolder,
  VolumeButton,
} from './style';
import { GetAuthSession } from '~/helpers/AuthSession';
import RatioSize from '~/helpers/RatioSize';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from '../components/arrows';
import { CardVertical } from '../components/CardVertical';
import usePreventBodyScroll from '../components/usePreventBodyScroll';
const BannerFeatured: any = dynamic(
  () => import('../components/banner-featured'),
  { ssr: false },
);

type Props = {
  initProducts: any;
  initClientProducts: any;
};

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const BemVindo: FC<PageTypes.Props & Props> = ({
  user,
  initProducts,
  initClientProducts,
}) => {
  const sizeLg = useMediaQuery('(min-width: 1200px)');
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  const [currentProduct, setCurrentProduct] = useState<ProductTypes.Product>();
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

  const { products } = useProducts(null, initProducts);
  const { product: clientProducts } = useGetClientProducts(
    user.id,
    null,
    initClientProducts,
  );

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

  useEffect(() => {
    let shouldPlay = false;
    const index = clientProducts.findIndex((product) => product?.video);
    if (index !== -1) {
      setFeaturedProduct(clientProducts[index]);
      shouldPlay = true;
    } else {
      const index = products.findIndex((product) => product.video);
      if (index !== -1) {
        setFeaturedProduct(products[index]);
        shouldPlay = true;
      } else {
        const index = clientProducts.findIndex(
          (product) => product.banner_image,
        );
        if (index !== -1) {
          setFeaturedProduct(clientProducts[index]);
          shouldPlay = false;
        } else {
          const index = products.findIndex((product) => product.banner_image);
          if (index !== -1) {
            setFeaturedProduct(products[index]);
            shouldPlay = false;
          }
        }
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

  const RenderMyProducts = useCallback(
    (p) => {
      return (
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          wrapperClassName="slick-track"
          itemClassName="slick-slide"
        >
          <Box width={12} />
          {p.map((product, index) => (
            <CardVertical
              key={product.id}
              itemId={product.id}
              product={product}
              onPopular={handlePopularProductsModal}
              user={user}
            />
          ))}
        </ScrollMenu>
      );
    },
    [user],
  );

  const RenderPopular = useCallback(
    (p) => {
      return (
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          wrapperClassName="slick-track"
          itemClassName="slick-slide"
        >
          {p.map((product, index) => (
            <CourseBox
              onMouseOver={() => {}}
              className="item"
              key={index}
              onClick={() => {
                const rel = clientProducts.find(
                  (p) => p.id === product.id,
                )?.relation;
                if ((rel && rel.approved) || product.owner === user.id) {
                  router.push(
                    types.find((type) => type.id.toString() === product.deliver)
                      .path +
                      '/' +
                      product.id,
                  );
                } else {
                  handlePopularProductsModal(product);
                }
              }}
            >
              <Image
                alt=""
                src={product?.banner_image || '/images/moonlit.png'}
                width={RatioSize('w', 1.97, '10/16')}
                height={RatioSize('h', 1.97, '10/16')}
                style={{
                  aspectRatio: '10/16',
                }}
                quality={90}
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
        </ScrollMenu>
      );
    },
    [clientProducts, router, types, user.id],
  );

  return (
    <Background>
      <BannerFeatured
        playVideoFade={playVideoFade}
        mainThumb={mainThumb}
        playVideo={playVideo}
        featuredProduct={featuredProduct}
        volume={volume}
        TextBanner={TextBanner}
        user={user}
        handlePopularProductsModal={handlePopularProductsModal}
        setVolume={setVolume}
      />
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
            <SliderWrapper>{RenderMyProducts(clientProducts)}</SliderWrapper>
          </>
        )}

        <Box sx={{ display: 'flex', margin: '0.5rem 0 0.5rem 0' }}>
          <Typography variant="h5">Populares na Mentorfy</Typography>
        </Box>

        <SliderWrapper>
          {RenderPopular(products.filter((p) => p.banner_image))}
        </SliderWrapper>

        {clientProducts?.length === 0 && <Box height="14rem" />}
      </ContentWidthLimit>

      <ModalComponent
        id="modal_destaque"
        open={open}
        setOpen={setOpen}
        popularProduct
      >
        <ModalDialogContent popularProduct>
          <>
            <VideoHolder id="holder">
              {currentProduct?.video ? (
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
                  src={currentProduct?.banner_image ?? '/images/moonlit.png'}
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
            </VideoHolder>
          </>
          <Box
            sx={{
              width: '100%',
              textAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              margin: '-4rem 0 1rem 0',
              padding: '0 1rem',
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
                {currentProduct?.title}
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
              {currentProduct?.description}
            </PopularProductDescription>
            {currentProduct?.relation ? (
              <>
                <PopularButton
                  variant="outlined"
                  onClick={() => setOpen(false)}
                >
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
    </Background>
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

  const { products } = (await ListProducts(session.access_token)) ?? {
    products: [],
  };
  const { products: ClientProducts } = (await ListProducts(
    session.access_token,
    session.user.id,
  )) ?? { products: [] };

  return {
    props: {
      user: session.user,
      initProducts: products,
      initClientProducts: ClientProducts,
    },
  };
};

export default BemVindo;
