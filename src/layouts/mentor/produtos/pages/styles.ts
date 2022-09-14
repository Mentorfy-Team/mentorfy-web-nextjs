import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const SaveButton = styled(Button)`
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
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const MembersAreaButton = styled(Button)``;
