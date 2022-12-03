import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 266px;
  padding: 1.3rem;
  text-align: left;
`;

export const Title = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
  line-height: 110.52%;
`;

export const SubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 110.52%;
`;
export const AvailableAmount = styled(Typography)`
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 110.52%;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

export const WalletAmount = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 110.52%;
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AdvanceButton = styled(Button)`
  font-size: 10px;
  font-weight: 500;
  line-height: 110.52%;
  padding: 0;
`;

export const TransferButton = styled(Button)`
  background: none;
  font-size: 0.7rem;
  background-color: ${({ theme }) => theme.palette.accent.main};
  font-weight: 500;
  line-height: 110.52%;
  padding: 0 0.3rem;
  text-transform: uppercase;
`;

export const BpCheckedIcon = styled('div')`
  background-image: url('/svgs/bp-checked-blue.svg');
  background-size: cover;
  height: 18px;
  width: 18px;
`;
