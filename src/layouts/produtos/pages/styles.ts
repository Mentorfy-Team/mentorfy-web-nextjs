import { Box, Button, styled } from '@mui/material';

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const SaveButton = styled(Button)``;

export const ReturnButton = styled(Button)`
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const ActionButton = styled(Button)`
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;
