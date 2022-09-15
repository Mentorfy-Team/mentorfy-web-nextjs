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
import door_svg from '~/../public/svgs/door';
import dots_svg from '~/../public/svgs/dots';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const columns: Column[] = [
  { id: 'name', label: 'NOME', minWidth: 140 },
  {
    id: 'mentorados',
    label: 'MENTORADOS',
  },
  {
    id: 'produto',
    label: 'PRODUTO',
    format: (value) =>
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    id: 'status',
    label: 'STATUS',
  },
];

interface Data {
  name: string;
  mentorados: number;
  produto: string;
  status: JSX.Element;
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
      mentorados: number,
      produto: string,
      status: string,
    ): Data => {
      return {
        name,
        mentorados,
        produto,
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
    setRows([createData('Método em 4 Semanas', 597.0, 'Mentoria 4S', 'Ativo')]);
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
              <SvgIcon color="info" component={dots_svg} />
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
              <Link href={'/mentor/editar-mentoria'}>
                <Button>
                  <SvgIcon
                    sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                    component={LinkIcon}
                  />
                  <Text width="100%">Ver Links</Text>
                </Button>
              </Link>
              <Button onClick={() => handleEdit()}>
                <SvgIcon sx={{ marginRight: '0.5rem' }} component={EditIcon} />{' '}
                Editar
              </Button>
            </PopoverBox>
          </Popover>
        </TableCell>,
      ]}
    />
  );
};

export default ProductsTable;
