import {CircularProgress} from '@mui/material';
import {parseToRgb, rgba} from 'polished';
import styled, {css} from 'styled-components';

export const Wrapper = styled.div<{ show: boolean }>`
  background-color: ${rgba({
    ...parseToRgb('#333333'),
    alpha: 0.7,
  })};

  display: flex;
  display: flex;
  height: 100vh;
  justify-content: center;
  justify-content: center;
  opacity: 0;
  position: fixed;
  transition: ease 0.6s;
  width: 100vw;
  z-index: -1;

  ${({show}) =>
    show &&
    css`
      opacity: 1;
      z-index: 999;
    `}
`;

export const Animation = styled(CircularProgress)`
  align-self: center;

  & > svg {
    color: #ffffff;
  }
`;
