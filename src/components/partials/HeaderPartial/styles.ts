import MuiAppBar from '@mui/material/AppBar';
import { css, styled } from '@mui/material/styles';

export const AppBar = styled(MuiAppBar)`
  align-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.caption.dark};
  box-shadow: none;
  height: 50px;
  justify-content: center;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;
