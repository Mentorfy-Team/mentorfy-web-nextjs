import { useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import { Box, SvgIcon, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import { ProductBox } from './style';

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
    id: 'produto',
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
  produto: JSX.Element;
  date: JSX.Element;
}

const ClientsTable = () => {
  const [page, setPage] = useState(1);

  function createData(
    name: string,
    email: string,
    produto: string,
    date: string,
  ): Data {
    return {
      name,
      email,
      produto: <ProductBox>{produto}</ProductBox>,
      date: <Box>
              <Typography>{date}</Typography>
              <Typography>{date}</Typography>
              <SvgIcon id="Arrow" component={ArrowForward}/>
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
