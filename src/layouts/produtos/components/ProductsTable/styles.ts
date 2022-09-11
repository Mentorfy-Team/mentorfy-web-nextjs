import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
    font-weight: 300;
    height: 2rem;
    justify-content: left;
    min-width: 8rem;
    .MuiSvgIcon-root {
      width: 1rem !important;
    }
  }
`;

export const OptionsButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  height: 32px;
  min-width: 32px;
  padding-left: 12px;
  padding-top: 10px;
  right: auto !important;
  width: 32px;
`;
