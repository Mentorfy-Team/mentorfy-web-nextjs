import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  .dark-mode {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
  }
`;

export const Wrapper = styled('div')``;
