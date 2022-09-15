import { useCallback, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
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

const ClientsTable = ({ data }) => {
  const [page, setPage] = useState(1);

  const createData = useCallback(
    (name: string, email: string, product: string, date: string): Data => {
      return {
        name,
        email,
        product: <ProductBox>{product}</ProductBox>,
        date: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="body2">{date.replace('T', ' ')}</Typography>
            </Box>
            <ArrowButton>
              <SvgIcon id="Arrow" component={ArrowForwardIos} />
            </ArrowButton>
          </Box>
        ),
      };
    },
    [],
  );

  const rows = useCallback(() => {
    return data.map((row) =>
      createData(
        'Alexandre Mendes',
        'alexandremendes@gmail.com',
        'Mentoria 4S',
        '10/09/2022T13:30',
      ),
    );
  }, [createData, data]);

  return (
    <Datagrid
      page={page}
      columns={columns}
      rows={rows()}
      onPageChange={setPage}
    />
  );
};

export default ClientsTable;
