import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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

export const Question = styled('div')`
  margin-top: 2rem;
  text-align: center;
  width: 100%;
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
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

export const TaskTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4rem;
  margin-bottom: 1rem;
`;
