import { FC, useCallback, useEffect, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '~/components/atoms/InputField';
import { MentorRoutes } from '~/consts';
import { useGetProduct } from '~/hooks/useGetProduct';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { UpdateProduct } from '~/services/product.service';
import {
  ActionButton,
  CustomTypograpy,
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
  const [productImage, setProductImage] = useState({
    main_image: { file: '', type: '' },
    banner_image: { file: '', type: '' },
  });
  const { handleSubmit, watch, setValue } = useForm<ProductClient.Product>();
  const { product: pData } = useGetProduct(id);
  const [product, setProduct] = useState<typeof pData>(pData);
  const { types } = useMemberAreaTypes();
  const theme = useTheme();

  useEffect(() => {
    setProduct(pData);
    setProductImage({
      main_image: {
        file: pData?.main_image || '',
        type: '',
      },
      banner_image: {
        file: pData?.banner_image || '',
        type: '',
      },
    });
  }, [pData]);

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
      await UpdateProduct({ ...values, id: product.id });
      setIsLoading(false);
    },
    [product, productImage],
  );

  const handleCapture = (target, imageType: 'main_image' | 'banner_image') => {
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
        <ReturnButton
          color="primary"
          onClick={() => route.push(MentorRoutes.products)}
        >
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
        Recomendamos, para uma melhor experiência, que você adicione a imagem
        principal do seu produto e a imagem de banner que é visivel para o
        cliente na area de destaque de produtos.
      </CustomTypograpy>
      <Divider
        sx={{
          borderColor: `${theme.palette.tertiary.light}`,
          marginBottom: '1.8rem',
        }}
      />
      <Grid container>
        <Grid md={5} xs={12} display="flex" pb={2} sx={{ float: 'left' }}>
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
              256x256 pixels
            </Typography>
          </Box>
        </Grid>
        <Grid md={7} xs={12} display="flex" pb={2} sx={{ float: 'left' }}>
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
              600x400 pixels
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <InputField
        color="secondary"
        value={product?.title}
        label="Produto Relacionado"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
      />

      <InputField
        color="secondary"
        value={
          types.find((type) =>
            type.id === product?.member_area
              ? (product?.member_area as any).type_id
              : 5,
          )?.name
        }
        label="Tipo de Área de Membros"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
      />
    </form>
  );
};

export default Geral;
