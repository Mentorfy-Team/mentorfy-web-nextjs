import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Step = styled(Box)`
  width: 100%;
`;

export const BoxHeader = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.4rem 0;
  .css-31awu6-MuiButtonBase-root-MuiIconButton-root {
    padding: 0;
  }
`;

export const WrapperContent = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0 0 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2.5rem;

  fieldset {
    height: 3rem;
  }
  .MuiFormControl-root-MuiTextField-root {
    height: 3rem;
  }
  input {
    padding: 0.75rem 0.9rem;
  }
`;
