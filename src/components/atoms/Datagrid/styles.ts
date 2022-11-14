import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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

export const QuestionsText = styled(Typography)`
  color: ${({theme}) => theme.palette.secondary.main};
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1rem;
`;

export const ResponseText = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
`;

export const ClientName = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.1rem;
`;
export const FinishedDate = styled(Typography)`
  color: ${({theme}) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.1rem;
`;

export const TitleWrapper = styled('div')`
 align-items: center;
 display: flex;
 flex-direction: column;
 left: 90%;
 position: relative;
`;
export const AvatarWrapper = styled('div')`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

