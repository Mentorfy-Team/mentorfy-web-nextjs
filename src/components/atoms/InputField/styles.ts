import { styled } from '@mui/material/styles';
import txtField from '@mui/material/TextField';

export const TextField = styled(txtField)`
  margin: 0.7rem 0;
  width: 100%;

  @media (max-width: 500px) {
    margin: 1rem 0;
  }

  input {
    font-size: 0.8rem;
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
