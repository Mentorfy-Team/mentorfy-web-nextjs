import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomAppBar = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  margin-bottom: 32px;
  padding-top: 16px;
  > p {
    margin-left: 24px;
  }
`;
