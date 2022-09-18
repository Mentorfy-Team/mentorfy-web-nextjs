import { FC, useCallback, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { MentorRoutes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { UpdateProduct } from '~/services/product.service';
import { ActionButton, ReturnButton, SaveButton } from '../styles';
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

  const { title, price, deliver } = watch();

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  const handleCapture = (target, imageType: 'main_image' | 'banner_image') => {
    const fileReader = new FileReader();
    if (!target.files || target.files.length <= 0) return;

    const type = target.files[0].type.split('/')[1];

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
          <Save sx={{ height: 32 }} />
          Salvar produto
        </SaveButton>
      </Box>
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
              fontWeight: 300,
            }}
          >
            <ActionButton
              sx={{ padding: '0px', height: '30px' }}
              color="primary"
              as="label"
              onChange={(e) => handleCapture(e.target, 'main_image')}
            >
              Trocar imagem
              <input hidden accept="image/*" type="file" />
            </ActionButton>
            <Typography color="gray" sx={{ textAlign: 'initial' }}>
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
              fontWeight: 300,
            }}
          >
            <ActionButton
              sx={{ padding: '0px', height: '30px' }}
              color="primary"
              as="label"
              onChange={(e) => handleCapture(e.target, 'banner_image')}
            >
              Trocar banner
              <input hidden accept="image/*" type="file" />
            </ActionButton>
            <Typography color="gray" sx={{ textAlign: 'initial' }}>
              Recomendação: <br />
              600x400 pixels
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
        label="Preço"
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
      <SelectField required sx={{ width: '100%' }}>
        <InputLabel>Entrega de Conteúdo</InputLabel>
        <Select
          label="Entrega de Conteúdo"
          defaultValue={product.deliver}
          value={deliver}
          onChange={(e) => handleChange(e, 'deliver')}
          color="secondary"
        >
          <MenuItem value={'mentorfy'}>
            Área de Membros
            <Typography
              component="b"
              color={(theme) => theme.palette.accent.main}
            >
              &nbsp;Mentorfy
            </Typography>
          </MenuItem>
          <MenuItem value={'external'}>Área de Membros Externa</MenuItem>
          <MenuItem value={'signup'}>Apenas Cadastros</MenuItem>
        </Select>
      </SelectField>
      {deliver === 'external' && (
        <InputField
          required
          color="secondary"
          label="Link para Área de Membros Externa"
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
