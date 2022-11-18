import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';

import { ProductBox, ProductWrapper, Qty } from './style';
import Button from '@mui/material/Button';
import NextImage from 'next/image';

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
    label: 'ACESSO AO PRODUTO',
  },
  {
    id: 'actions',
    label: '',
  },
];

interface Data {
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
  state: JSX.Element;
  actions: JSX.Element;
  id: string;
}

const ApprovalsTable = ({
  rows = [],
  onApprovalDone,
}: {
  rows: UserClient.ClientRelation[];
  onApprovalDone: (id, product_id, approved) => void;
}) => {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: { id: string }) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    [],
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createData = useCallback(
    (
      id: string,
      name: string,
      email: string,
      product: string,
      product_id: string,
      qty: number,
      date: string,
      state: string,
      onApprovalDone: (id, product_id, approved) => void,
    ): Data => {
      return {
        id,
        name,
        email,
        product: (
          <ProductWrapper>
            <ProductBox>
              <p>{product}</p>
            </ProductBox>
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
          </Box>
        ),
        actions: (
          <div key={`settings-${id}`} style={{ padding: '0px' }}>
            <Button onClick={() => onApprovalDone(id, product_id, false)}>
              <NextImage
                width={30}
                height={30}
                src="/svgs/reject.svg"
                alt="accept"
              />
            </Button>
            <Button onClick={() => onApprovalDone(id, product_id, true)}>
              <NextImage
                width={30}
                height={30}
                src="/svgs/accept.svg"
                alt="accept"
              />
            </Button>
          </div>
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
          row.id,
          row.name,
          row.email,
          lastProduct.title,
          lastProduct.id,
          row.products.length,
          lastProduct.subscribed_at,
          'Ativo',
          onApprovalDone,
        );
      })}
      onPageChange={setPage}
    />
  );
};

export default ApprovalsTable;
