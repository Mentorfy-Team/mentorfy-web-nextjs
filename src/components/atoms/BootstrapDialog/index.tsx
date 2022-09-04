import { Dialog, css, styled } from '@mui/material';

export default styled(Dialog)`
  ${({ theme }) => css`
    bottom: calc(0);
    position: absolute;
    .MuiDialogContent-root {
      background-color: ${theme.palette.primary.main};
      max-width: 400;
      padding: theme.spacing(2);
    }
    .MuiDialogActions-root {
      background-color: ${theme.palette.primary.main};
      padding: theme.spacing(1);
    }
  `}
`;
