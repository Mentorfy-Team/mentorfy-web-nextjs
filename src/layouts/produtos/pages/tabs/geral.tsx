import { FC } from 'react';
import { Save } from '@mui/icons-material';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { InputField, SelectField } from '~/components';
import { Routes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { ActionButton, ReturnButton, SaveButton } from '../styles';
import { chavron_left_svg } from '~/../public/svgs';

const Geral: FC = () => {
  const route = useRouter();
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: <Box>{`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}</Box>,
    };
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={4}
      >
        <ReturnButton
          sx={{
            float: 'right',
          }}
          color="primary"
          onClick={() => route.push(Routes.products)}
        >
          <SvgIcon
            sx={{ paddingTop: '0.4rem', paddingRight: '0.3rem' }}
            component={chavron_left_svg}
          />
          Voltar
        </ReturnButton>
        <SaveButton
          sx={{
            float: 'right',
            marginLeft: '2rem',
          }}
          variant="outlined"
          color="primary"
          onClick={() => {}}
        >
          <SvgIcon
            sx={{ paddingBottom: '0.2rem', paddingRight: '0.3rem' }}
            component={Save}
          />
          Salvar produto
        </SaveButton>
      </Box>
      <Box display="flex" pb={2} sx={{ float: 'left' }}>
        <Box
          {...stringAvatar('Mentoria 4S')}
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
            sx={{ padding: '0px' }}
            color="primary"
            onClick={() => {}}
          >
            Trocar imagem
          </ActionButton>
          <Typography color="gray" sx={{ textAlign: 'initial' }}>
            Recomendação: <br />
            300x250 pixels
          </Typography>
        </Box>
      </Box>

      <InputField
        required
        color="accent"
        id="outlined-required"
        value="Mentoria 4S"
        label="Nome do produto"
        onChange={(e) => {}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputField
        required
        color="accent"
        id="outlined-required"
        label="Preço"
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
          value={2}
          label="Entrega de Conteúdo"
          onChange={() => {}}
          color="accent"
        >
          <MenuItem value={2}>
            Área de Membros
            <Typography
              component="b"
              color={(theme) => theme.palette.accent.main}
            >
              &nbsp;Mentorfy
            </Typography>
          </MenuItem>
          <MenuItem value={1}>Área de Membros Externa</MenuItem>
          <MenuItem value={0}>Apenas cadastros</MenuItem>
        </Select>
      </SelectField>
    </>
  );
};

export default Geral;
