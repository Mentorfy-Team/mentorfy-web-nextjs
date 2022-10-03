import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputField from '~/components/atoms/InputField';

export const QuestionsBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 5px;
  height: 227px;
  overflow: auto;
  padding: 0.7rem;
`;

export const QuestionInput = styled('input')`
  background-color: inherit;
  border: 1px solid gray;
  border-radius: 2px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  margin-left: 1rem;
  padding: 0.2rem 0.5rem;
  width: 100%;

  &:focus {
    border: 1px solid white;
  }
`;

export const Question = styled(Box)`
  align-items: center;
  display: flex;
`;

export const QuestionField = styled(InputField)`
  margin-left: 0.7rem;
`;

export const AddQButton = styled(Button)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
  text-transform: none;
`;
