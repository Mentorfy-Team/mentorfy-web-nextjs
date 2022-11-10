import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  text-align: start;
`;

export const CompleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin-top: 1rem;
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  a {
    text-decoration: none;
  }
`;

export const WheelWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
`;

export const ContentWrapper = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const ForwardButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  width: 200px;
`;

export const BackButton = styled(Button)`
  background: none;
  width: 200px;
`;

export const TextQuestion = styled(Typography)`
  font-size: 1.2rem;
  span {
    font-weight: bold;
    margin-left: 0.2rem;
  }
`;
