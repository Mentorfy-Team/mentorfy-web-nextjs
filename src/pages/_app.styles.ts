import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const PageWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
  min-height: inherit;
`;
