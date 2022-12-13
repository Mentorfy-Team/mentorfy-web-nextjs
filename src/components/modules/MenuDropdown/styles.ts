import { styled } from '@mui/material/styles';
import ButtonMUI from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Wrapper = styled(Box)`
  .Mui-disabled {
    color: rgb(136 136 136) !important;
    font-weight: 300 !important;
  }
`;

export const Button = styled(ButtonMUI)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;
