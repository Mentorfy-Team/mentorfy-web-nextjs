import { useCallback, useMemo, useState } from 'react';
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
  onTitleClick,
}: TableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery('(max-width: 490px)');
  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage >= 1) onPageChange(newPage);
  };

  const CreateButtons = (row) => {
    const ac = actionButtons;

    return ac(row);
  };

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
                              onClick={() =>
                                index === 0 &&
                                onTitleClick &&
                                onTitleClick(row.id)
                              }
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
    </PaperWrapper>
  );
}
