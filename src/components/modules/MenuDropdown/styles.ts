import { styled } from '@mui/material/styles';
import ButtonMUI from '@mui/material/Button';

export const Button = styled(ButtonMUI)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;
