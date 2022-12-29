import { FC } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import InputField from '@app/components/atoms/InputField';
import { MentorRoutes } from '@app/consts';
import { ReturnButton } from '../styles';
import ChavronLeftSvg from '@app/../public/svgs/chavron-left';

type props = {
  product: ProductClient.Product;
};

const Links: FC<props> = ({ product }) => {
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
          onClick={() => route.push(MentorRoutes.products)}
        >
          <ChavronLeftSvg />
          <span>Voltar</span>
        </ReturnButton>
      </Box>

      <InputField
        color="secondary"
        id="outlined-required"
        value={`https://mentoryfy/mb/${product.refeerer}`}
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
        value={`https://mentoryfy/signup/${product.refeerer}`}
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
