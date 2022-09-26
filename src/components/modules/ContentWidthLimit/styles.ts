import Box from '@mui/material/Box';
import { styled, css } from '@mui/material/styles';

export const ScrollArea = styled(Box)<{withtoolbar:string}>`
  border-radius: 0.5rem;
  text-align: -webkit-center;
  overflow-x: hidden;
  ${({ withtoolbar }) => css`
    height: calc(100vh - (4rem + ${withtoolbar === 'true' ? '4rem' : '0rem'}));
  `}
`;
