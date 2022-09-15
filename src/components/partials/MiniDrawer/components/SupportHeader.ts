import { css, styled } from '@mui/material/styles';

export const WrapperSupportHeader = styled('div')`
  width: 100%;

  ${({ theme }) => css`
    ${theme.breakpoints.up('sm')} {
      padding-left: 0.45rem;
    }
  `}
`;
