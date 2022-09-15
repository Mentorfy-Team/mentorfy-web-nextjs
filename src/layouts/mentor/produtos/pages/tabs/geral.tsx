import { FC } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { MentorRoutes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { stringToColor } from '~/helpers/StringToColor';
import { ActionButton, ReturnButton, SaveButton } from '../styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';

const Geral: FC = () => {
  const route = useRouter();

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
          onClick={() => {}}
        >
          <Save sx={{ height: 32 }} />
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
        color="secondary"
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
        color="secondary"
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
          color="secondary"
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
