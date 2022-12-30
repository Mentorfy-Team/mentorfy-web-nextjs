import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ScrollArea = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const Bundle = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 273px;
  max-width: 280px;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  @media(max-width: 900px){ 
    max-height: 500px;
    max-width: 350px;
  }
`;

export const ImageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const BundleTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
`;

export const BundleMonth = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
`;

export const TasksWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 0.8rem;
  overflow: auto;
`;

export const Task = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  padding: 0.6rem 1rem;
  width: 100%;
`;

export const TasktTitle = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1rem;
`;
