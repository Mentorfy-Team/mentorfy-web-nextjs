import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TipWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

export const TipText = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;

  span {
    color: ${({ theme }) => theme.palette.secondary.main};
    margin: 0 0.2rem 0 0.2rem;
  }
`;
