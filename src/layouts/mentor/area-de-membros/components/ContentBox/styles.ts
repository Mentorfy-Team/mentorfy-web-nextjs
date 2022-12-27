import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ContentWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 5px;
  min-height: 227px;
  overflow: auto;
  padding: 0.8rem;
  width: 100%;
`;
