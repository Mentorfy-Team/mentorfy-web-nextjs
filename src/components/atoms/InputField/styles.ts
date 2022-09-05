import { styled, TextField as txtField } from '@mui/material';

export const TextField = styled(txtField)`
  margin: 1rem 0;
  width: 100%;

  @media (max-width: 500px) {
    margin: 1rem 0;
  }

  .MuiFormLabel-root {
    color: white;
  }
  .MuiInputBase-root {
    fieldset {
      border: 1px solid white;
      border-color: grey;
    }
    fieldset:focus {
      border: 1px solid white;
    }
  }
`;
