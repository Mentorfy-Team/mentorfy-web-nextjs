import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ScrollArea = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.7rem;
  justify-content: center;
`;

export const Bundle = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius:10px;
  height: 273px;
  min-width: 280px;
  padding: 1rem;
`;

export const ImageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const BundleTitle= styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  margin-top: 0.2rem;
`;

export const BundleMonth= styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
  
`;

export const TasksWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  height: 140px;
  margin-bottom: 1rem;
  margin-top: 0.8rem;
  overflow: auto;
`;

export const Task = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  padding: 0.3rem 1rem;
  width: 100%;
`;

export const TasktTitle = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1rem;
`;
