import { FC } from 'react';
import { Box, SvgIcon } from '@mui/material';
import { useRouter } from 'next/router';
import { InputField } from '~/components';
import { Routes } from '~/consts';
import { ReturnButton } from '../styles';
import { chavron_left_svg } from '~/../public/svgs';

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
        color="accent"
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
        color="accent"
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
