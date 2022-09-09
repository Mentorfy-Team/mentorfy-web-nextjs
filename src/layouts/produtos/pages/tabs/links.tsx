import { FC } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { useRouter } from 'next/router';
import InputField from '~/components/atoms/InputField';
import { Routes } from '~/consts';
import { ReturnButton } from '../styles';
import chavron_left_svg from '~/../public/svgs/chavron-left';

const Links: FC = () => {
  const route = useRouter();
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={2}
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
      </Box>

      <InputField
        color="secondary"
        id="outlined-required"
        value="https://mentoryfy/membros/mentoria-4s"
        label="Link para área de membros"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
      />
      <InputField
        color="secondary"
        id="outlined-required"
        value="https://mentoryfy/cadastro/mentoria-4s"
        label="Link de cadastro"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
};

export default Links;
