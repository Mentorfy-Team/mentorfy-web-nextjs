import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const MentorInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
`;

export const MentorName = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1rem;
  margin-top: 0.3rem;
`;

export const MentorEmail = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActiveClients = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.1rem;
  margin-top: 0.5rem;
`;

export const ClientsNumber = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.1rem;
`;

export const Mentor = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding-right: 0.5rem;
  border-radius: 0 5px 5px 0;
  display: flex;
  cursor: pointer;
`;
