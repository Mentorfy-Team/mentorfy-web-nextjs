import { Box, Typography, styled } from '@mui/material';

export const PoliciesWrapper = styled(Box)`
  align-items: center;
  display: flex;

  .MuiCheckbox-root {
    color: ${({ theme }) => theme.palette.caption.main};
  }

  .Mui-checked {
    color: ${({ theme }) => theme.palette.success.main};
  }
`;

export const Policies = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};

  a {
    color: ${({ theme }) => theme.palette.accent.main};
    text-decoration: none;
  }
`;
