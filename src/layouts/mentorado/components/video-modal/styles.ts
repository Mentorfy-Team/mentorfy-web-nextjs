import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  max-width: 600px;
  text-align: start;
`;

export const CompleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 10rem;
`;

export const CommentInput = styled('textarea')`
  background-color: #252525;
  border: 1px solid ${({ theme }) => theme.palette.caption.dark};
  border-radius: 6px;
  color: ${({ theme }) => theme.palette.text.primary};
  flex-grow: 1;
  font-size: 0.9rem;
  font-weight: 400;
  height: 2.3rem;
  max-width: 88%;
  min-width: 88%;
  overflow-y: hidden;
  padding: 0.4rem 1rem;
  resize: none;
`;

export const SendButton = styled(Button)`
  align-items: center;
  border-radius: 6px;
  display: flex;
  gap: 0.5rem;
  width: 12%;
`;
