import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ScrollArea = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  
`;

export const Bundle = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius:10px;
  height: 550px;
  overflow: auto;
  padding: 2.5rem;
`;

export const ImageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const BundleTitle= styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 0.2rem;
`;

export const BundleDescription = styled(Typography)`
    color: ${({ theme }) => theme.palette.caption.main};
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.3rem;
    margin-bottom: 1rem;
`;

export const TasksWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 0.8rem;
`;

export const Task = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  padding: 0.6rem;
  width: 100%;
`;

export const TasktTitle = styled(Typography)`
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3rem;
`;
