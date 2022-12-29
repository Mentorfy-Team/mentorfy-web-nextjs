import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const CardWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  // scale x
  svg {
    transform: scaleX(0.8);
  }
`;

export const MethodText = styled(Typography)`
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1rem;
`;

export const PaymentMethWrapper = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
