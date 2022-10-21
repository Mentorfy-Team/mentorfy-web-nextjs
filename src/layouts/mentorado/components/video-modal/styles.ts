import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  max-width: 600px;
  text-align: start;
`;

export const CompleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin-top: 1rem;
`;
