import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const CloseButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin: 3rem 0 0 auto;
  width: 200px;
`;
// calendly-inline-widget

export const CalendalyWrapper = styled(Box)`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.caption.main};
  padding: 1rem 0 0 0;
  // center child
  justify-content: center;
  .calendly-inline-widget {
    flex: 1;
    max-width: 649px;
  }
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  text-align: start;
`;

export const EmbedHolder = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  display: flex;
  justify-content: center;
  max-width: calc(80vw);
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
`;
