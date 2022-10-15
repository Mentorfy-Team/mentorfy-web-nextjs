import CircularProgress from '@mui/material/CircularProgress';
import { css, styled } from '@mui/material/styles';

export const LoadingWrapper = styled('div')<{ show: boolean }>`
  background-color: #00000080;

  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: ease 0.4s;
  width: 100%;
  z-index: -1;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      z-index: 9999;
    `}
`;

export const Animation = styled(CircularProgress)`
  align-self: center;

  & > svg {
    color: #ffffff;
  }
`;
