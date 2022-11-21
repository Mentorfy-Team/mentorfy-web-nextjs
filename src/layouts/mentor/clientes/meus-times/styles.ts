import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TipWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

export const TipText = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;

  span {
    color: ${({ theme }) => theme.palette.secondary.main};
    margin: 0 0.2rem 0 0.2rem;
  }
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;

  justify-content: end;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export const MentorButtons = styled(Button)`
  align-items: center;
  display: flex;

  gap: 0.75rem;

  justify-content: center;
  line-height: 1rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 3.5rem;
  }
`;

export const DeleteMentorButtons = styled(Button)`
  align-items: center;
  display: flex;

  gap: 0.75rem;

  justify-content: center;
  line-height: 1rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 3.5rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.palette.failure.main};
    color: white;
  }
`;

export const TeamWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  padding: 1rem;
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
  gap: 1.2rem;
  margin: 1.5rem 0;
  padding: 1rem 0.6rem;
`;

export const Mentor = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0 5px 5px 0;
  display: flex;
`;

export const MentorInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

export const MentorName = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3rem;
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
`;

export const ClientsNumber = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.1rem;
`;

export const NewTeamButton = styled(Button)`
  align-items: center;
  background: none;

  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.main};

  display: flex;
  gap: 0.5rem;
  justify-content: center;
  line-height: 1rem;
  margin-left: auto;
  max-width: 15%;
  text-transform: none;
`;
