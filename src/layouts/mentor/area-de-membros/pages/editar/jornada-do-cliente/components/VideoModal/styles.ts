import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StudentComments = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
`;

export const ResponseText = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 1.2rem;
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
  position: relative;
`;
export const AvatarWrapper = styled('div')`
  background-color: gray;
  border-radius: 50%;
  height: 40px;
  margin-bottom: 0.5rem;
  width: 40px;
`;

export const AnswersWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  width: 100%;
`;

export const TaskTitle = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const NoInfoText = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.dark};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4rem;
`;
