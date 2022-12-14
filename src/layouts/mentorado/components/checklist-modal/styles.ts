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

export const CloseButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.accent.main};
  float: right;
  margin-top: 3.8rem;
  width: 200px;
`;

export const OptionsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  overflow-y: auto;
  text-align: center;
  padding-right: 0.5rem;
`;

export const OptionsBox = styled(Box)`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

export const OptionsText = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  opacity: 0.8;
  // texto justificado
  text-align: justify;
`;

export const BpIcon = styled('span')`
  border: 1px solid #ffff;
  border-radius: 50%;
  height: 18px;
  width: 18px;
`;

export const BpCheckedIcon = styled('div')`
  align-items: center;
  background-image: url('/svgs/bp-checked-icon.svg');
  border-radius: 50%;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;
`;

export const TaskTitle = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4rem;
  margin-bottom: 1rem;
  text-overflow: ellipsis;
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
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
