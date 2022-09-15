import { css, styled } from '@mui/material/styles';

interface AppBarProps {
  open?: boolean;
}

export const WrapperSupportHeader = styled('div')<AppBarProps>`
  width: 100%;

  ${({ theme, open }) => css`
    ${theme.breakpoints.up('sm')} {
      padding-left: 0.45rem;
    }
  `}
`;
