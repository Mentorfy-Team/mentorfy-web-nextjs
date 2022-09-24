import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const TaskWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0.3rem;
  height: 13.5rem;
  margin: 1rem 0;
  overflow: auto;
  padding: 1rem;
  width: 100%;
`;

export const Task = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.palette.tertiary.main};
  display: flex;
  gap: 1rem;
  height: 2.8rem;

  justify-content: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
`;

export const TaskTitle = styled(Box)`
  align-items: center;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.palette.text.primary};

  display: flex;
  font-size: 1rem;
  font-weight: 400;

  height: 1.8rem;
  line-height: 1.2rem;

  overflow: hidden;
  white-space: nowrap;
  width: 70%;
`;

export const ModalBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.6rem;
  padding: 1rem 2.5rem;
  width: 35%;
`;
