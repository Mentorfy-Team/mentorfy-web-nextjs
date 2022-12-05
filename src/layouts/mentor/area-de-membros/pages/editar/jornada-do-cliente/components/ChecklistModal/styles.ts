import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const QuestionsText = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
`;

export const ResponseText = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
`;

export const ClientName = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.1rem;
`;
export const FinishedDate = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.1rem;
`;

export const TitleWrapper = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export const AvatarWrapper = styled('div')`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

export const AnswersWrapper = styled('div')`
  width: 100%;
`;

export const TaskTitle = styled(Typography)`
  align-self: center;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.accent.main};
`;

export const SubTaskTitle = styled(Typography)`
  align-self: center;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4rem;
  display: contents;
  p {
    align-self: start;
  }
`;

export const TaskWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 2rem;
  width: 100%;
`;
