import { Paper, TableRow, styled } from '@mui/material';

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
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
  td {
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-bottom: none;
  }
  td:nth-child(1) {
    border-left: solid 4px ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const CustomNavigation = styled('div')`
  display: flex;

  margin-bottom: 2rem;
  margin-top: 2rem;
  place-content: flex-end;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    place-content: space-between;
  }

  button {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 5px;
    color: #fff;
    height: 2.5rem;
    margin: 0 0 0 5px;
    width: 2.5rem;
    font-size: 1.3rem;
    font-weight: 300;
    padding-bottom: 0.5rem;
  }
  button:disabled {
    background-color: ${({ theme }) => theme.palette.caption.dark};
    border-radius: 5px;
    color: rgb(255 255 255 / 26%);
  }
  button:hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
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
