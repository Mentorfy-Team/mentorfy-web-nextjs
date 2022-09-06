import { useState } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import { ArrowButton, P, ProductBox } from './style';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});
const columns: Column[] = [
  {
    id: 'name',
    label: 'NOME',
  },
  {
    id: 'email',
    label: 'E-MAIL',
  },
  {
    id: 'product',
    label: 'PRODUTO',
  },
  {
    id: 'date',
    label: 'DATA DA COMPRA',
  },
];

interface Data {
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
}

const ClientsTable = () => {
  const [page, setPage] = useState(1);

  function createData(
    name: string,
    email: string,
    product: string,
    date: string,
  ): Data {
    return {
      name,
      email,
      product: <ProductBox>{product}</ProductBox>,
      date: <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
              <P>{date}</P>
              <Typography>{date}</Typography>
            </Box>
            <ArrowButton>
              <SvgIcon id="Arrow" component={ArrowForwardIos}/>
            </ArrowButton>
            </Box>,
    };
  }

  const rows = [
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),
    createData('Alexandre Mendes', 'alexandremendes@gmail.com', 'Mentoria 4S', 'Cerca de 8 horas'),

  ];
  return <Datagrid
           page={page}
           columns={columns}
           rows={rows}
           onPageChange={setPage}
          />;
};

export default ClientsTable;
