import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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

export const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
`;
