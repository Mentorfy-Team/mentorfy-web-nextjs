import CircularProgress from '@mui/material/CircularProgress';
import { css, styled } from '@mui/material/styles';

export const Wrapper = styled('div')<{ show: boolean }>`
  background-color: #33333399;

  display: flex;
  height: 100vh;
  justify-content: center;
  opacity: 0;
  position: fixed;
  transition: ease 0.4s;
  width: 100vw;
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
