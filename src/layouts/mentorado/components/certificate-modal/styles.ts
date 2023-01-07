import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const DataText = styled(Typography)`
  color: black;
  position: absolute;
  font-style: italic;
  font-weight: 600;
`;

export const PDFButton = styled(Box)<{ href; download; target }>`
  font-size: 1rem !important;
  padding: 0.4rem 0.8rem;
  align-self: center;
  background-color: ${({ theme }) => theme.palette.accent.main};
`;

export const FileWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  aspect-ratio: 16/10;
  max-width: 90vw;
  margin-bottom: 1rem;
  position: relative;
`;
export const ForwardButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  width: 200px;
`;
