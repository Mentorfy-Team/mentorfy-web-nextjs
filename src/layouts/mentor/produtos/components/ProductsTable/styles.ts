import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Text = styled(Typography)`
  font-size: 0.8rem;
`;

export const MarginPopopver = styled(Box)`
  float: right;
  margin-right: 10%;
`;

export const EnterMemberArea = styled(Box)`
  color: ${({ theme }) => theme.palette.accent.main};
  * {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
  cursor: pointer;
`;

export const PopoverBox = styled(Box)`
  position: relative;
  button {
    font-size: 0.7rem;
    height: 2rem;
    justify-content: left;
    min-width: 8rem;
    width: 100px;
    .MuiSvgIcon-root {
      width: 1rem !important;
    }
  }
`;

export const OptionsButton = styled(Button)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.caption.dark};
  display: flex;
  justify-content: center;
  min-width: 32px;
  padding: 0px;
  padding: 0rem 0.6rem;
  right: auto !important;
  width: 32px;
`;
