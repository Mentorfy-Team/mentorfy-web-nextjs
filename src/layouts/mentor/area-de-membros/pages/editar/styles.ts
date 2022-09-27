import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SaveButton = styled(Button)`
  svg {
    scale: 0.7;
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ScrollWrapper = styled(Box)<{withtoolbar?:string}>`
${({ withtoolbar }) => css`
  max-height: calc(100vh - (11rem + ${withtoolbar === 'true' ? '4rem' : '0rem'}));
  overflow-y: auto;
  `}
`;

export const CustomTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.palette.tertiary.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 1.2rem auto;
  text-align: start;
`;

