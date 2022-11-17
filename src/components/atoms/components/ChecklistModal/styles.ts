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
  color: ${({theme}) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.1rem;
`;

export const TitleWrapper = styled('div')`
 align-items: center;
 display: flex;
 flex-direction: column;
 left: 90%;
 position: relative;
`;
export const AvatarWrapper = styled('div')`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

export const AnswersWrapper = styled('div')`
  max-height: 350px;
  overflow-y: auto; 
`;

export const TaskTitle = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4rem;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TaskWrapper = styled('div')`
  border-bottom: 1px solid ${({theme}) => theme.palette.caption.dark};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  width: 90%;
`;
