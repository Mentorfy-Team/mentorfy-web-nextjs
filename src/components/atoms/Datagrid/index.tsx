import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomNavigation, CustomRow, PaperWrapper } from './styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';
import ChavronRightSvg from '~/../public/svgs/chavron-right';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const SwicthClientJouneyModal = dynamic(
  () => import('~/components/atoms/helpers/SwicthModal'),
);

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
};

type TableProps = {
  actionButtons?: (index) => JSX.Element[];
  columns: Column[];
  rows: any[];
  page: number;
  completedClient?: any[];
  selectedTask?: MentorTools.ToolData;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onTitleClick?: (id) => void;
};

export default function StickyHeadTable({
  actionButtons,
  page = 1,
  onPageChange,
  rows = [],
  columns = [],
  completedClient,
  selectedTask,
  onTitleClick,
}: TableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [clientInputs, setClientInputs] = useState<any>([]);
  const [finishedDate, setFinishedDate] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 490px)');
  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage >= 1) onPageChange(newPage);
  };
  const route = useRouter();
  const CreateButtons = (row) => {
    const ac = actionButtons;

    return ac(row);
  };

  useEffect(() => {});
  //? TODO: Implementar rows per page se necessário
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    onPageChange(0);
  };

  const maxPages = useMemo(() => {
    if (rows.length <= rowsPerPage) return 1;
    return Math.round(rows.length / rowsPerPage);
  }, [rows, rowsPerPage]);

  const EmptyRows = useCallback(() => {
    if (rows.length > 0) return <></>;
    return (
      <Typography pt={4} color="GrayText">
        Nenhum resultado encontrado
      </Typography>
    );
  }, [rows]);

  const handleGoToProfile = useCallback(
    (id) => {
      route.push(route.asPath + '/perfil?id=' + id);
    },
    [route],
  );

  // ! TODO: Remover codigo especifico e deixar genérico por ser um componente global
  const handleData = (completedClient) => {
    setClientInputs(() => {
      if (completedClient?.length > 0) {
        const Inputs = completedClient[0].inputs?.filter(
          (input) => input.member_area_tool_id === selectedTask.id,
        );
        if (Inputs?.length > 0) {
          setFinishedDate(Inputs[0].created_at);
          const InputsData = Inputs[0].data;
          return InputsData;
        }
      }
    });
  };

  const handleModal = useCallback(() => {
    return (
      <SwicthClientJouneyModal
        open={open}
        setOpen={setOpen}
        type={selectedTask?.mentor_tool}
        completedClient={completedClient}
        selectedTask={selectedTask}
        finishedDate={finishedDate}
        clientInputs={clientInputs}
      />
    );
  }, [clientInputs, completedClient, finishedDate, open, selectedTask]);

  return (
    <PaperWrapper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 12px',
          }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              <EmptyRows />
              {rows
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage,
                )
                .map((row, index) => {
                  return (
                    <CustomRow hover role="checkbox" tabIndex={-1} key={index}>
                      <>
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              onClick={() => {
                                if (index <= columns.length - 2) {
                                  onTitleClick && onTitleClick(row.id);

                                  if (completedClient) {
                                    handleData(completedClient);
                                    setOpen(true);
                                  } else {
                                    handleGoToProfile(row.id);
                                  }
                                }
                              }}
                              sx={{
                                padding: '8px 16px',
                                height: '45px',
                                cursor:
                                  index === 0 && onTitleClick
                                    ? 'pointer'
                                    : 'auto',
                              }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </>
                    </CustomRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>
      <CustomNavigation>
        <Button
          disabled={page !== maxPages || page === 1}
          onClick={(e) => handleChangePage(e, page - 1)}
        >
          <ChavronLeftSvg />
        </Button>
        <Typography variant="body2" marginX={isMobile ? 0 : 4} mt={1}>{`${
          isMobile ? page : `Página ${page}`
        } de ${maxPages}`}</Typography>
        <Button
          disabled={page === maxPages || maxPages === 0}
          onClick={(e) => handleChangePage(e, page + 1)}
        >
          <ChavronRightSvg />
        </Button>
      </CustomNavigation>

      <div>{handleModal()}</div>
    </PaperWrapper>
  );
}
