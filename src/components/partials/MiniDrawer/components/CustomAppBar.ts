import { css, styled } from '@mui/material/styles';

interface AppBarProps {
  open?: boolean;
}

export const CustomAppBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>`
  background-color: transparent;

  box-shadow: none;

  > div {
    background-color: ${({ theme }) => theme.palette.primary.light};
    transition: ${({ theme }) =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }

  transition: ${({ theme }) =>
    theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  ${({ theme, open }) =>
    open &&
    css`
      transition: ${theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};
      width: calc(100% - 240);
    `}

  button {
    transition: ${({ theme }) =>
      theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }
`;
