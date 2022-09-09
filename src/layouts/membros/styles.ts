import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ActionButton = styled(Button)`
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const AddMemberButton = styled(Button)``;

export const CopyLinkButton = styled(Button)``;
