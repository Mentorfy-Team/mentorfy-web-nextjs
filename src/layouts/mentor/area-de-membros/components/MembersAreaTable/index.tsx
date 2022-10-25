import { useCallback, useState } from 'react';
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
import { MarginPopopver, OptionsButton, PopoverBox, Text } from './styles';
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
    id: 'status',
    label: 'STATUS',
  },
];

interface Data {
  id: string;
  name: string;
  mentorados: number;
  status: JSX.Element;
}

const ProductsTable = ({ rows }: { rows: MemberAreaTypes.MemberArea[] }) => {
  const [page, setPage] = useState(1);
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const createData = useCallback(
    (id: string, name: string, mentorados: number, status: boolean): Data => {
      return {
        id,
        name,
        mentorados,
        status: (
          <Box
            sx={{
              backgroundColor: status ? '#86ffb9' : '#ff98ac',
              color: status ? '#075327' : '#6b1728',
              fontWeight: 'bold',
              width: 60,
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            <Typography variant="body2">
              {status ? 'Ativo' : 'Inativo'}
            </Typography>
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

  const handleEdit = (id = 'x') => {
    route.push(MentorRoutes.members_area_editar + '/' + id);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  return (
    <Datagrid
      page={page}
      onPageChange={setPage}
      columns={columns}
      rows={rows.map((row) =>
        createData(row.id, row.title, row.clients, row.status),
      )}
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
            id={'popover-' + index}
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
              <Link href={MentorRoutes.members_area_editar}>
                <Button>
                  <SvgIcon
                    sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                    component={LinkIcon}
                  />
                  <Text width="100%">Ver Links</Text>
                </Button>
              </Link>
              <Button onClick={() => handleEdit(rows[index].id)}>
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
