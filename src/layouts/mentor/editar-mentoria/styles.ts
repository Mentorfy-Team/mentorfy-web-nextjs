import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CustomTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.palette.tertiary.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 1.2rem auto;
  text-align: start;
`;

export const StepOne = styled(Box)`
  border-radius: 1.2rem 1.2rem 0 0;
`;

export const BoxHeader = styled(Box)`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem 0;
`;
