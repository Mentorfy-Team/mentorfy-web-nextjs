import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  display: flex;
  gap: 1.3rem;
  overflow: auto;
  width: 100%;
`;

export const Step = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 24rem;
  min-width: 24rem;
  padding: 1rem 1rem;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin: 0rem 0 1rem 0;
  text-align: start;
`;

export const Task = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  padding: 0.6rem 1rem;
`;

export const TasktTitle = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1rem;
`;

export const Title = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
`;
