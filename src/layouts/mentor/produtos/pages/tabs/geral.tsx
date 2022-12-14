import { FC, useCallback, useState } from 'react';
import RoomPreferences from '@mui/icons-material/RoomPreferences';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '~/components/atoms/InputField';
import { MentorRoutes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { UpdateProduct } from '~/services/product.service';
import { ReturnButton, SaveButton, SvgWrapper } from '../styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';
type props = {
  product: ProductClient.Product;
};

const Geral: FC<props> = ({ product }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productImage, setProductImage] = useState({
    main_image: { file: product.main_image, type: '' },
    banner_image: { file: product.banner_image, type: '' },
  });
  const { handleSubmit, watch, setValue } = useForm<ProductClient.Product>();
  const { types } = useMemberAreaTypes();
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

  const { title, price, deliver, description } = watch();

  const handleChange = (e, name) => {
    //setValue(name, e.target.value);
  };

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
          Salvar produto
        </SaveButton>
      </Box>
      {/* <Grid container>
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
              Recomenda????o: <br />
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
              Recomenda????o: <br />
              600x400 pixels
            </Typography>
          </Box>
        </Grid>
      </Grid> */}
      <InputField
        required
        color="secondary"
        defaultValue={product.title}
        label="Nome do produto"
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
        onChange={(e) => handleChange(e, 'title')}
      />
      <InputField
        required
        color="secondary"
        defaultValue={product.description}
        label="Descri????o do produto"
        InputLabelProps={{
          shrink: true,
        }}
        multiline
        minRows={4}
        placeholder="D?? uma descri????o detalhada do produto."
        value={description}
        onChange={(e) => handleChange(e, 'description')}
      />
      <InputField
        required
        color="secondary"
        label="Pre??o"
        defaultValue={product.price}
        placeholder="R$ "
        InputLabelProps={{
          shrink: true,
        }}
        value={price}
        InputProps={{
          inputComponent: MoneyFormatComponent as any,
        }}
        onChange={(e) => handleChange(e, 'price')}
      />
      <Box display="flex">
        <InputField
          color="secondary"
          value={
            types.find((type) =>
              type.id === product?.member_area
                ? (product?.member_area as any).type_id
                : 5,
            )?.name
          }
          label="Tipo de ??rea de Membros"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
          style={{ flex: 1 }}
        />
        <Button
          sx={{
            float: 'right',
            marginLeft: '2rem',
            width: '150px',
            margin: '0.5rem 0 0.6rem 1rem',
          }}
          variant="text"
          color="primary"
          onClick={() =>
            route.push(MentorRoutes.members_area_editar + '/' + product.id)
          }
        >
          <SvgWrapper>
            <RoomPreferences />
          </SvgWrapper>
          Abrir ??rea
        </Button>
      </Box>
      {deliver === 'external' && (
        <InputField
          required
          color="secondary"
          label="Link para ??rea de Membros Externa"
          defaultValue={product.access_link}
          placeholder="https://..."
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => handleChange(e, 'access_link')}
        />
      )}
    </form>
  );
};

export default Geral;
