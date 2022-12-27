import { styled } from '@mui/material/styles';

export const Title = styled('h4')`
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const Value = styled('h1')``;

export const Percentage = styled('h4')<{ value }>`
  color: ${({ theme, value }) =>
    value >= 0 ? theme.palette.success.main : theme.palette.error.main};
`;
