import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const FileWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  aspect-ratio: 16/9;
  max-width: 900px;
  margin-bottom: 1rem;
  position: relative;
`;
