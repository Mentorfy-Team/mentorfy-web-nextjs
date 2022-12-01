import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TeamWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  padding: 1rem 1rem 0 1rem;
  text-align: left;
`;

export const TeamTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.1rem;
`;

export const MentorsWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 1rem;
`;
