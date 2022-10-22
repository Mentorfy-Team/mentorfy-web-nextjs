import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiGrid from '@mui/material/Unstable_Grid2';

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  text-align: start;
`;

export const CompleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin-top: 1rem;
`;

export const Question = styled(MuiGrid)``;

export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const ForwardButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  width: 200px;
`;

export const BackButton = styled(Button)`
  background: none;
  width: 200px;
`;
