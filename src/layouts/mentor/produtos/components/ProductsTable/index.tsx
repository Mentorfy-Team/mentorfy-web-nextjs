import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Column } from '~/components/atoms/Datagrid';
import { MentorRoutes } from '~/consts';
import {
  EnterMemberArea,
  MarginPopopver,
  OptionsButton,
  PopoverBox,
  Text,
} from './styles';
import DoorSvg from '~/../public/svgs/door';
import DotsSvg from '~/../public/svgs/dots';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const columns: Column[] = [
  { id: 'name', label: 'NOME', minWidth: 140 },
  {
    id: 'price',
    label: 'PREÇO',
    format: (value) =>
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    id: 'memberArea',
    label: 'Área de Membros',
  },
  {
    id: 'status',
    label: 'STATUS',
  },
];

interface Data {
  name: string;
  price: number;
  memberArea?: JSX.Element;
  status: JSX.Element;
  actions: any;
}

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createData = useCallback(
    (
      name: string,
      price: number,
      status: string,
      memberArea?: number,
      actions?: any,
    ): Data => {
      return {
        name,
        price,
        memberArea: memberArea ? (
          <EnterMemberArea
            onClick={() => route.push(MentorRoutes.members_area + '/1')}
            display="flex"
          >
            <Box>
              <DoorSvg />
            </Box>
            <Typography pl={2} fontSize="0.959rem" lineHeight="1.15rem">
              Entrar
            </Typography>
          </EnterMemberArea>
        ) : null,
        status: (
          <Box
            sx={{
              backgroundColor: status === 'Ativo' ? '#86ffb9' : '#ff98ac',
              color: status === 'Ativo' ? '#075327' : '#6b1728',
              fontWeight: 'bold',
              width: 60,
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            <Typography variant="body2">{status}</Typography>
          </Box>
        ),
        actions: '',
      };
    },
    [],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id = 'hud2-ioqdf-002e-eee7') => {
    route.push(MentorRoutes.products_edit + '/' + id);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    setRows([
      createData('Mentoria S1', 597.0, 'Ativo', 1),
      createData('Mentoria S2', 597.0, 'Ativo'),
      createData('Mentoria S3', 597.0, 'Ativo'),
      createData('Mentoria S4', 597.0, 'Ativo'),
      createData('Mentoria S5', 597.0, 'Ativo'),
      createData('Mentoria S6', 597.0, 'Ativo'),
      createData('Mentoria S7', 597.0, 'Ativo'),
      createData('Mentoria S8', 597.0, 'Ativo'),
      createData('Mentoria S9', 597.0, 'Ativo'),
      createData('Mentoria S10', 597.0, 'Ativo'),
      createData('Mentoria S11', 597.0, 'Ativo'),
      createData('Mentoria S12', 597.0, 'Ativo'),
      createData('Mentoria S13', 597.0, 'Ativo'),
      createData('Mentoria S14', 597.0, 'Ativo'),
      createData('Mentoria S15', 597.0, 'Ativo'),
    ]);
  }, [createData]);

  return (
    <Datagrid
      page={page}
      onPageChange={setPage}
      columns={columns}
      rows={rows}
      onTitleClick={(id) => handleEdit(id)}
      actionButtons={(index) => [
        <TableCell
          key={`settings-${index}`}
          align="left"
          style={{ minWidth: 100, padding: '0px' }}
        >
          <MarginPopopver
            sx={{ width: 35, height: 32 }}
            onClick={(e) => handleClick(e as any)}
          >
            <OptionsButton>
              <SvgIcon color="info" component={DotsSvg} />
            </OptionsButton>
          </MarginPopopver>
          <Popover
            id={'simple-popover-' + index}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transitionDuration={1}
          >
            <PopoverBox display="flex" flexDirection="column">
              <Link
                href={'/mentor/produtos/editar/1516-qwe45-dw48i-ghhg7'}
                passHref
              >
                <Button>
                  <SvgIcon
                    sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                    component={LinkIcon}
                  />
                  <Text width="100%">Ver Links</Text>
                </Button>
              </Link>
              <Link
                href={'/mentor/produtos/editar/1516-qwe45-dw48i-ghhg7'}
                passHref
              >
                <Button>
                  <SvgIcon
                    sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                    component={EditIcon}
                  />
                  <Text width="100%">Editar</Text>
                </Button>
              </Link>
            </PopoverBox>
          </Popover>
        </TableCell>,
      ]}
    />
  );
};

export default ProductsTable;
