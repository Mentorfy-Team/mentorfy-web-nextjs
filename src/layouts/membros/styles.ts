import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ActionButton = styled(Button)`
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  * {
    line-height: 1.2rem;
  }
`;

export const AddMemberButton = styled(Button)``;

export const CopyLinkButton = styled(Button)``;
