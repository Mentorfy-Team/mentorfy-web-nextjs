/* eslint-disable better-styled-components/sort-declarations-alphabetically */
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Theme, css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerWidth = '220px';

const openedMixin = (theme: Theme) => `
  width: ${DrawerWidth};
  transition: ${theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })};
  overflow-x: hidden;
`;

const closedMixin = (theme: Theme) => `
  transition: ${theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })};
  overflow-x: hidden;
  width: calc(${theme.spacing(7)} + 1px);
  ${theme.breakpoints.up('sm')} {
    width: calc(${theme.spacing(8)} + 1px);
}
`;

export const DrawerHeader = styled(Box)`
  display: 'flex';
  align-items: 'center';
  justify-content: 'flex-end';
  padding: ${({ theme }) => theme.spacing(0, 1)};

  ${({ theme }) => theme.mixins.toolbar}
`;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  transition: ${({ theme }) =>
    theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};

  > div {
    background-color: ${({ theme }) => theme.palette.primary.light};
    transition: ${({ theme }) =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }

  background-color: transparent;
  box-shadow: none;

  ${({ theme, open }) =>
    open &&
    css`
      transition: ${theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};
      width: calc(100% - ${DrawerWidth});
    `}

  button {
    transition: ${({ theme }) =>
      theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }
`;

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})`
  div {
    background-color: unset;
  }
  box-sizing: border-box;
  flex-shrink: 0;
  * {
    overflow: hidden;
  }
  white-space: nowrap;

  * {
    transition: ${({ theme }) =>
      theme.transitions.create(['margin, opacity, width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }

  ${({ theme, open }) => {
    if (open) {
      return `
          > div {
            ${openedMixin(theme)}
          }
          background-color: ${theme.palette.primary.light};
          ${openedMixin(theme)}
          & .MuiDrawer-paper: {${openedMixin(theme)}};
        `;
    } else {
      return `
        >div{
          width: 65px;
        }
        @media (max-width: ${theme.breakpoints.values.sm}px) {
          width: 0vw !important;
          > div {
            width: 0vw !important;
          }
        }
        background-color: ${theme.palette.primary.light};
        ${closedMixin(theme)}
        & .MuiDrawer-paper: {${closedMixin(theme)}};
      `;
    }
  }};
`;

export const UserName = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary} !important;
`;

export const Kind = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const AnimatedBox = styled(Box)<{ isLoading: boolean }>`
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};

  ${({ theme }) => css`
    transition: ${theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: 50,
    })};
  `}
`;

export const UserField = styled(Box)`
  background-color: ${({ theme }) => theme.palette.caption.dark} !important;
  height: 4rem;
  align-items: center;
`;

export const ProFree = styled(Box)`
  height: 20px;
  width: 50px;
  text-align-last: center;
  padding-top: 2px;
  margin-left: 1.8rem;
  font-size: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.accent.main} !important;
  color: ${({ theme }) => theme.palette.text.primary} !important;
`;

export const WrapperSupportHeader = styled(Box)<AppBarProps>`
  width: 100%;

  ${({ theme, open }) => css`
    ${theme.breakpoints.up('sm')} {
      margin-left: ${!open && '4rem'};
      padding-left: 0.45rem;
    }
  `}
`;
