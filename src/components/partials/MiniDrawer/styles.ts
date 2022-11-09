/* eslint-disable better-styled-components/sort-declarations-alphabetically */
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Theme, css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface AppBarProps {
  open?: boolean;
}

const DrawerWidth = '200px';

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
  width: calc(${theme.spacing(5)} + 1px);
  ${theme.breakpoints.up('sm')} {
    width: calc(${theme.spacing(6)} + 2px);
}
`;

export const DrawerHeader = styled(Box)`
  display: 'flex';
  align-items: 'center';
  justify-content: 'flex-end';
  padding: ${({ theme }) => theme.spacing(0, 1)};
  margin-top: 2.5rem;
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

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
  span {
    font-size: 0.8rem;
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
          ${closedMixin(theme)}
          width: 50px;
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

  * {
    transition: ${({ theme }) =>
      theme.transitions.create(['margin, opacity, width, left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
  }
`;

export const UserName = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary} !important;
`;

export const Kind = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const AnimatedBox = styled(Box)<{ loading: boolean }>`
  opacity: ${({ loading }) => (loading ? 0 : 1)};

  ${({ theme }) => css`
    * {
      transition: ${theme.transitions.create('opacity, left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
    }
  `}
`;

export const UserField = styled(Box)`
  background-color: ${({ theme }) => theme.palette.caption.dark} !important;
  height: 4rem;
  align-items: center;
`;

export const ProFree = styled(Box)<{ type: string }>`
  height: 20px;
  width: 50px;
  text-align-last: center;
  padding-top: 2px;
  margin-left: 1.8rem;
  font-size: 10px;
  border-radius: 10px;
  background-color: ${({ theme, type }) =>
    type === 'pro'
      ? theme.palette.accent.main
      : theme.palette.secondary.main} !important;
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
