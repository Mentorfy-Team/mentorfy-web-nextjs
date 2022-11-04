import { useCallback, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import { ArrowButton, ProductBox, ProductWrapper, Qty } from './style';

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
    label: 'PRODUTOS',
  },
  {
    id: 'state',
    label: 'STATUS',
  },
  {
    id: 'date',
    label: 'ÚLTIMA COMPRA',
  },
];

interface Data {
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
  state: JSX.Element;
}

const ClientsTable = ({ rows = [] }: { rows: UserClient.ClientRelation[] }) => {
  const [page, setPage] = useState(1);

  const createData = useCallback(
    (
      name: string,
      email: string,
      product: string,
      qty: number,
      date: string,
      state: string,
    ): Data => {
      return {
        name,
        email,
        product: (
          <ProductWrapper>
            <ProductBox><p>{product}</p></ProductBox>
            {qty > 1 ? <Qty>+{qty - 1}</Qty> : ''}
          </ProductWrapper>
        ),
        state: <div>{state}</div>,
        date: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography>
                {new Date(date).toLocaleString('pt-BR', {
                  day: 'numeric',
                  weekday: 'long',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
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

  const getMaxSubscribedAtDate = (array) => {
    const dates = array.map((item) => new Date(item.subscribed_at));

    return new Date(Math.max.apply(null, dates));
  };

  const findLastProduct = (array) => {
    const maxDate = getMaxSubscribedAtDate(array);
    const lastProduct = array.find((item) => {
      return new Date(item.subscribed_at).toString() === maxDate.toString();
    });
    return lastProduct;
  };

  return (
    <Datagrid
      page={page}
      columns={columns}
      rows={rows.map((row) => {
        const lastProduct = findLastProduct(row.products);
        return createData(
          row.name,
          row.email,
          lastProduct.title,
          row.products.length,
          lastProduct.subscribed_at,
          'Ativo',
        );
      })}
      onPageChange={setPage}
    />
  );
};

export default ClientsTable;
