import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const PaperWrapper = styled(Paper)`
  background-color: transparent;
  .MuiTableCell-head {
    background-color: transparent;
  }
  .MuiInputBase-root {
    display: none;
  }
  .MuiTablePagination-selectLabel {
    display: none;
  }
`;

export const CustomRow = styled(TableRow)`
  td {
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-bottom: none;
    cursor: pointer !important;
    button {
      float: right;
      right: 20%;
    }
  }
  td:nth-child(1) {
    border-left: solid 4px ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const CustomNavigation = styled('div')`
  display: flex;

  margin-bottom: 1rem;
  margin-top: 1rem;
  place-content: flex-end;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    place-content: space-between;
  }

  button {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 5px;
    color: #fff;
    min-width: 20px;
  }
  button:disabled {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    border-radius: 5px;
    color: rgb(255 255 255 / 26%);
  }
  button:hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }

  svg {
    scale: 0.6;
  }
`;

export const Wrapper = styled('div')`
  .rs-input {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  .rs-pagination-group {
    place-content: space-between;
  }
`;
