import { Button, styled } from '@mui/material';

export const OptionsButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  height: 32px;
  min-width: 32px;
  padding-left: 12px;
  padding-top: 10px;
  width: 32px;
`;
