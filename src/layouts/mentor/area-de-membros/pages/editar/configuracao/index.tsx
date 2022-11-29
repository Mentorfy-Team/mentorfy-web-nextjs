import { FC, useCallback, useEffect, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SketchPicker } from 'react-color';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '~/components/atoms/InputField';
import { useGetProduct } from '~/hooks/useGetProduct';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { UpdateProduct } from '~/services/product.service';
import {
  AbsolutePosition,
  ActionButton,
  CustomTypograpy,
  PickerWrapper,
  ReturnButton,
  SaveButton,
  SvgWrapper,
} from './styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';
type props = {
  id: string;
};
const Geral: FC<props> = ({ id }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<string>('');
  const [productImage, setProductImage] = useState({
    main_image: { file: '', type: '' },
    banner_image: { file: '', type: '' },
    extra_image: { file: '', type: '' },
  });
  const { handleSubmit, watch, setValue } = useForm<ProductClient.Product>();
  const { product: pData } = useGetProduct(id);
  const [product, setProduct] = useState<typeof pData>(pData);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const { types } = useMemberAreaTypes();
  const [currentType, setCurrentType] = useState<MemberAreaTypes.Type>();
  const theme = useTheme();
  const [displayPicker, setDisplayPicker] = useState<{ one; two; three }>({
    one: false,
    two: false,
    three: false,
  });
  const [colorPick, setColorPick] = useState<{ one; two; three }>({
    one: '#fff',
    two: '#fff',
    three: '#fff',
  });

  useEffect(() => {
    setProduct(pData);
    setDescription(pData.description);
    setTitle(pData?.title);
    setColorPick({
      one: pData?.extra?.titleGradiente.one,
      two: pData?.extra?.titleGradiente.two,
      three: pData?.extra?.titleGradiente.three,
    });
    setProductImage({
      main_image: {
        file: pData?.main_image || '',
        type: '',
      },
      banner_image: {
        file: pData?.banner_image || '',
        type: '',
      },
      extra_image: {
        file: pData?.extra_image || '',
        type: '',
      },
    });
    setVideo(pData?.video || '');

    setCurrentType(
      types.find((type) => {
        return type.id === (product?.member_area as any)?.type_id;
      }),
    );
  }, [pData, setValue, types, product?.member_area]);

  const onSubmit: SubmitHandler<ProductClient.CreateProduct> = useCallback(
    async (values) => {
      setIsLoading(true);
      if (productImage.main_image.file !== product.main_image) {
        Object.assign(values, {
          main_image: productImage.main_image.file,
          main_type: productImage.main_image.type,
          main_owner: product.owner,
          old_main_url: product.main_image,
        });
      }
      if (productImage.banner_image.file !== product.banner_image) {
        Object.assign(values, {
          banner_image: productImage.banner_image.file,
          banner_type: productImage.banner_image.type,
          banner_owner: product.owner,
          old_banner_url: product.banner_image,
        });
      }
      if (productImage.extra_image.file !== product.extra_image) {
        Object.assign(values, {
          extra_image: productImage.extra_image.file,
          extra_type: productImage.extra_image.type,
          extra_owner: product.owner,
          old_extra_url: product.extra_image,
        });
      }
      await UpdateProduct({
        ...values,
        video,
        id: product.id,
        description,
        title,
        extra: { titleGradiente: colorPick },
      });
      toast.success('Alterações salvas com sucesso', { autoClose: 2000 });
      setIsLoading(false);
    },
    [product, productImage, video, colorPick, description, title],
  );

  const handleCapture = (
    target,
    imageType: 'main_image' | 'banner_image' | 'extra_image',
  ) => {
    const fileReader = new FileReader();
    if (!target.files || target.files.length <= 0) return;

    const type = target.files[0].type.split('/')[1];
    fileReader.readAsDataURL(target.files[0]);

    fileReader.onload = (e) => {
      setProductImage((old) => ({
        ...old,
        [imageType]: { file: e.target.result, type },
      }));
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={4}
      >
        <ReturnButton color="primary" onClick={() => route.back()}>
          <ChavronLeftSvg />
          <span>Voltar</span>
        </ReturnButton>
        <SaveButton
          sx={{
            float: 'right',
            marginLeft: '2rem',
          }}
          variant="outlined"
          color="primary"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <SvgWrapper>
            <Save />
          </SvgWrapper>
          Salvar alterações
        </SaveButton>
      </Box>
      <CustomTypograpy>
        Recomendamos, para uma melhor experiência, que você adicione o banner
        vertical e o banner horizontal, para se tornar visivel para os usuários
        na área de destaque de produtos.
      </CustomTypograpy>
      <Divider
        sx={{
          borderColor: `${theme.palette.tertiary.light}`,
          marginBottom: '1.8rem',
        }}
      />
      <InputField
        color="secondary"
        value={title}
        label="Produto Relacionado"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputField
        color="secondary"
        value={description}
        label="Descrição"
        placeholder="Escreva a descrição do seu produto aqui"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputField
        color="secondary"
        value={video}
        label="Vídeo de Apresentação ( opcional / recomendado )"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Cole o link do vídeo aqui"
        onChange={(e) => setVideo(e.target.value)}
      />
      <InputField
        color="secondary"
        value={currentType?.name}
        disabled
        label="Tipo de Área de Membros"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
        style={{ marginBottom: '1.0rem' }}
      />
      <PickerWrapper>
        <Typography>
          Cor gradiente do título da mentoria ( opcional )
        </Typography>
        <Box display="flex" gap={4}>
          <Box id="ColorOne" sx={{ position: 'relative' }}>
            <Box
              width="1.5rem"
              height="1.5rem"
              mt={1}
              sx={{
                border: '2px solid #ffffff',
                borderRadius: '10%',
                padding: '5px',
                background: colorPick?.one || '#d4d4d4',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
              onClick={() =>
                setDisplayPicker({
                  ...displayPicker,
                  one: !displayPicker.one,
                })
              }
            ></Box>
            {displayPicker.one && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  }}
                  onClick={() =>
                    setDisplayPicker({
                      ...displayPicker,
                      one: !displayPicker.one,
                    })
                  }
                />
                <AbsolutePosition>
                  <SketchPicker
                    color={colorPick?.one || '#d4d4d4'}
                    onChange={(color) =>
                      setColorPick((old) => {
                        return { ...old, one: color.hex };
                      })
                    }
                  />
                </AbsolutePosition>
              </>
            )}
          </Box>
          <Box id="ColorTwo" sx={{ position: 'relative' }}>
            <Box
              width="1.5rem"
              height="1.5rem"
              mt={1}
              sx={{
                border: '2px solid #ffffff',
                borderRadius: '10%',
                padding: '5px',
                background: colorPick?.two || '#d4d4d4',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
              onClick={() =>
                setDisplayPicker({
                  ...displayPicker,
                  two: !displayPicker.two,
                })
              }
            ></Box>
            {displayPicker.two && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  }}
                  onClick={() =>
                    setDisplayPicker({
                      ...displayPicker,
                      two: !displayPicker.two,
                    })
                  }
                />
                <AbsolutePosition>
                  <SketchPicker
                    color={colorPick?.two || '#d4d4d4'}
                    onChange={(color) =>
                      setColorPick((old) => {
                        return { ...old, two: color.hex };
                      })
                    }
                  />
                </AbsolutePosition>
              </>
            )}
          </Box>
          <Box id="ColorThree" sx={{ position: 'relative' }}>
            <Box
              width="1.5rem"
              height="1.5rem"
              mt={1}
              sx={{
                border: '2px solid #ffffff',
                borderRadius: '10%',
                padding: '5px',
                background: colorPick?.three || '#d4d4d4',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
              onClick={() =>
                setDisplayPicker({
                  ...displayPicker,
                  three: !displayPicker.three,
                })
              }
            ></Box>
            {displayPicker.three && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  }}
                  onClick={() =>
                    setDisplayPicker({
                      ...displayPicker,
                      three: !displayPicker.three,
                    })
                  }
                />
                <AbsolutePosition>
                  <SketchPicker
                    color={colorPick?.three || '#d4d4d4'}
                    onChange={(color) =>
                      setColorPick((old) => {
                        return { ...old, three: color.hex };
                      })
                    }
                  />
                </AbsolutePosition>
              </>
            )}
          </Box>
        </Box>
      </PickerWrapper>
      <Grid mt={3} container>
        <Grid md={5} xs={12} pb={2} sx={{ float: 'left' }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: '0.6rem', textAlign: 'start' }}
          >
            Banner Vertical
          </Typography>
          <Box display="flex">
            {productImage.main_image.file ? (
              <Image
                alt="imagem do produto"
                src={productImage.main_image.file}
                width={90}
                height={90}
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  bgcolor: (theme) => theme.palette.secondary.main,
                  minWidth: 90,
                  height: 90,
                  borderRadius: 1,
                  display: 'flex',
                  placeItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{
                float: 'right',
                marginLeft: '1rem',
              }}
            >
              <ActionButton
                sx={{ padding: '0px', height: '20px' }}
                color="primary"
                as="label"
                onChange={(e) => handleCapture(e.target, 'main_image')}
              >
                Trocar imagem
                <input hidden accept="image/*" type="file" />
              </ActionButton>
              <Typography
                variant="caption"
                color="gray"
                sx={{ textAlign: 'initial' }}
              >
                Recomendação: <br />
                300x400 pixels
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid md={7} xs={12} pb={2} sx={{ float: 'left' }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: '0.6rem', textAlign: 'start' }}
          >
            Banner Horizontal
          </Typography>
          <Box display="flex">
            {productImage.banner_image.file ? (
              <Image
                alt="imagem do produto"
                src={productImage.banner_image.file}
                width={180}
                height={90}
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  bgcolor: (theme) => theme.palette.secondary.main,
                  minWidth: 180,
                  height: 90,
                  borderRadius: 1,
                  display: 'flex',
                  placeItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{
                float: 'right',
                marginLeft: '1rem',
              }}
            >
              <ActionButton
                sx={{ padding: '0px', height: '20px' }}
                color="primary"
                as="label"
                onChange={(e) => handleCapture(e.target, 'banner_image')}
              >
                Trocar banner
                <input hidden accept="image/*" type="file" />
              </ActionButton>
              <Typography
                variant="caption"
                color="gray"
                sx={{ textAlign: 'initial' }}
              >
                Recomendação: <br />
                360x190 pixels
              </Typography>
            </Box>
          </Box>
        </Grid>
        {currentType?.id === 3 && (
          <Grid xs={12} pb={2} sx={{ float: 'left' }}>
            <Typography
              variant="body1"
              sx={{ marginBottom: '0.6rem', textAlign: 'start' }}
            >
              Banner Central na Área de Membros
            </Typography>
            <Box display="flex">
              {productImage.extra_image.file ? (
                <Image
                  alt="imagem do produto"
                  src={productImage.extra_image.file}
                  width={180}
                  height={90}
                  style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    bgcolor: (theme) => theme.palette.secondary.main,
                    minWidth: 180,
                    height: 90,
                    borderRadius: 1,
                    display: 'flex',
                    placeItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              )}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                sx={{
                  float: 'right',
                  marginLeft: '1rem',
                }}
              >
                <ActionButton
                  sx={{ padding: '0px', height: '20px' }}
                  color="primary"
                  as="label"
                  onChange={(e) => handleCapture(e.target, 'extra_image')}
                >
                  Trocar banner central
                  <input hidden accept="image/*" type="file" />
                </ActionButton>
                <Typography
                  variant="caption"
                  color="gray"
                  sx={{ textAlign: 'initial' }}
                >
                  Recomendação: <br />
                  1000x200 pixels
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Geral;
