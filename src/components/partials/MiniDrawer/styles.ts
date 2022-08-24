/* eslint-disable better-styled-components/sort-declarations-alphabetically */
import { Box, Theme, Typography, css, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerWidth = '205px';

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
    transition: ${({ theme }) =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }

  background-color: ${({ theme }) => theme.palette.primary.light};
  border-left: solid 1px #424242;
  box-shadow: none;

  margin-left: 201px;

  ${({ theme, open }) =>
    open &&
    css`
      transition: ${theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};
      width: calc(100% - ${DrawerWidth});
    `}
`;

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})`
  * {
    color: ${({ theme }) => theme.palette.caption.main};
  }
  div {
    background-color: unset;
  }
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100vh;
  overflow: hidden !important;
  white-space: nowrap;

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
