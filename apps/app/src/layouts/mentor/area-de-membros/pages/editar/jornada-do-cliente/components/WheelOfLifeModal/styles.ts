import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const QuestionsText = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 0.9rem;
  font-weight: 700;
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
  max-height: 350px;
  width: 100%;
`;

export const TaskTitle = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4rem;
  margin-bottom: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const WheelWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
`;
