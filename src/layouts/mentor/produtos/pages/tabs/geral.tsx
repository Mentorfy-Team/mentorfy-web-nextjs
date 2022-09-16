import { FC, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { MentorRoutes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { ActionButton, ReturnButton, SaveButton } from '../styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';

type props = {
  product: ProductClient.Product;
};

const Geral: FC<props> = ({ product }) => {
  const route = useRouter();
  const [productImage, setProductImage] = useState<any>();
  const handleSave = () => {
    console.log(productImage);
  };

  const handleCapture = (target, imageType: 'main' | 'banner') => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setProductImage({ [imageType]: e.target.result });
    };
  };

  return (
    <>
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
          onClick={() => handleSave()}
        >
          <Save sx={{ height: 32 }} />
          Salvar produto
        </SaveButton>
      </Box>
      <Grid container>
        <Grid md={5} xs={12} display="flex" pb={2} sx={{ float: 'left' }}>
          {product.main_image ? (
            <Image
              alt="imagem do produto"
              src={product.main_image}
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
              onChange={(e) => handleCapture(e.target, 'main')}
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
          {product.banner_image ? (
            <Image
              alt="imagem do produto"
              src={product.banner_image}
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
              onChange={(e) => handleCapture(e.target, 'main')}
            >
              Trocar imagem
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
        id="outlined-required"
        defaultValue={product.title}
        label="Nome do produto"
        onChange={(e) => {}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputField
        required
        color="secondary"
        id="outlined-required"
        label="Preço"
        defaultValue={product.price}
        placeholder="R$ "
        onChange={(e) => {}}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputComponent: MoneyFormatComponent as any,
        }}
      />
      <SelectField required sx={{ width: '100%' }}>
        <InputLabel>Entrega de Conteúdo</InputLabel>
        <Select
          label="Entrega de Conteúdo"
          defaultValue={product.deliver}
          onChange={() => {}}
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
          <MenuItem value={'signup'}>Apenas cadastros</MenuItem>
        </Select>
      </SelectField>
    </>
  );
};

export default Geral;
