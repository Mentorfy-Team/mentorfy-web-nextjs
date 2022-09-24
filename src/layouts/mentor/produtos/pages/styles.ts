import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;

export const SvgWrapper = styled('div')`
  svg {
    margin-right: 8px;
    margin-top: 6px;
    scale: 0.7;
  }
`;

export const SaveButton = styled(LoadingButton)``;

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
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
  font-size: 0.9rem;
`;

export const MembersAreaButton = styled(Button)``;
