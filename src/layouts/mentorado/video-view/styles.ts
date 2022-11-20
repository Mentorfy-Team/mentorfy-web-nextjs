import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const VideoWrapper = styled(Box)`
  padding-bottom: 3rem;
  text-align: start;
`;

export const ProgressBarWrapper = styled(Box)`
  padding: 1rem 0 0 2rem;
`;

export const VideoInteractionsBox = styled(Box)`
  align-items: end;
  border-bottom: 1px dotted #424242;
  display: flex;
  height: 3.5rem;
  justify-content: space-between;
  margin-top: 1rem;
  padding-bottom: 1.2rem;
  width: 100%;
`;

export const LikeButton = styled('button')`
  align-items: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 2.4rem;
  justify-content: center;
  transition: 0.1s;
  width: 2.4rem;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

export const CompleteButton = styled(Button)`
  align-items: center;
  background-color: #20361f;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.success.main};
  display: flex;
  gap: 0.5rem;
  margin-left: 2rem;
  width: 8rem;
`;

export const NextVButton = styled(Button)`
  align-items: center;
  background-color: #424242;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  gap: 0.5rem;
  width: 7rem;
`;

export const CommentInput = styled('textarea')`
  background-color: #252525;
  border: 1px solid ${({ theme }) => theme.palette.caption.dark};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  flex-grow: 1;
  font-size: 0.9rem;
  font-weight: 400;
  max-width: 88%;
  min-height: 0rem;
  min-width: 88%;
  overflow-y: hidden;
  padding: 0.5rem 0.75rem;
`;

export const SendButton = styled(Button)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  gap: 0.5rem;
  width: 12%;
`;
