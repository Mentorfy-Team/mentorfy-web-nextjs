import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const SaveButton = styled(LoadingButton)`
  svg {
    margin-right: 8px;
  }
`;

export const ReturnButton = styled(Button)`
  span {
    margin-left: 16px;
  }
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const ActionButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  font-weight: bold;
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const MembersAreaButton = styled(Button)``;
