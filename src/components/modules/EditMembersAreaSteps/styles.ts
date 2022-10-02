import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Step = styled(Box)`
  border-radius: 1.2rem 1.2rem 0 0;
  margin: 0 0 0.8rem 0;
  width: 100%;
`;

export const BoxHeader = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.3rem;
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
  .css-1x8ds66-MuiFormControl-root-MuiTextField-root {
    height: 3rem;
  }
  input {
    padding: 0.75rem 0.9rem;
  }
`;
