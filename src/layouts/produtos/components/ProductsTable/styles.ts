import { Box, Button, styled } from '@mui/material';

export const MarginPopopver = styled(Box)`
  float: right;
  margin-right: 10%;
`;

export const PopoverBox = styled(Box)`
  button {
    background-color: white;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 300;
    height: 2rem;
    min-width: 8rem;
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
