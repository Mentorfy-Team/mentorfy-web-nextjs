import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputField from '@app/components/atoms/InputField';

export const TaskField = styled(InputField)`
  border: none;

  .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root {
    height: 2rem;
  }
`;

export const TaskWrapper = styled(Box)`
  align-items: center;
  display: flex;
`;

export const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 0.8rem;
  margin-left: 0.3rem;
  min-width: 49px;
  padding: 0;
`;

export const DeleteButton = styled(Button)`
  background-color: none;
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 0.8rem;
  min-width: 49px;
  padding: 0;
`;

export const TaskTypography = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  margin-left: 0.7rem;
  padding: 0.6rem 0;
  width: 80%;
`;

export const AddTaskButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 0.9rem;
  text-transform: none;
`;

export const LinkInputWrapper = styled(Box)`
  flex-direction: column;
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

export const AcceptedLinksText = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1rem;
  font-style: italic;
`;
