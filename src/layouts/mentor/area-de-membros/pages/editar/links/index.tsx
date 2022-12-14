import { FC } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import InputField from '~/components/atoms/InputField';
import { useGetProduct } from '~/hooks/useGetProduct';

type props = {
  id: string; //ProductClient.Product;
};

const Links: FC<props> = ({ id }) => {
  const route = useRouter();
  const { product } = useGetProduct(id);
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={2}
      >
        <div />
      </Box>

      <InputField
        color="secondary"
        id="outlined-required"
        value={`${process.env.NEXT_PUBLIC_BASE_URL}?signup=${product.refeerer}`}
        label="Link de cadastro"
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
        value={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        label="Link para área de membros"
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
