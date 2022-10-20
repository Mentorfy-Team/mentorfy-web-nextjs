import Box from '@mui/material/Box';
import { css, styled } from '@mui/material/styles';

export const ScrollArea = styled(Box)<{ withtoolbar: string }>`
  border-radius: 0.5rem;
  overflow-x: hidden;
  text-align: -webkit-center;

  ${({ withtoolbar }) => css`
    height: calc(100vh - (4rem + ${withtoolbar === 'true' ? '5rem' : '0rem'}));
  `}
`;
