import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

export const SelectFormControl = styled(FormControl)`
  margin: 1rem 0;
  text-align: left;
  width: 50%;
  .MuiFormLabel-root {
    color: white;
  }

  .Mui-focused {
    color: ${({ theme }) => theme.palette.secondary.main} !important;
    fieldset {
      border: 1px solid ${({ theme }) => theme.palette.secondary.main} !important;
      border-color: grey;
    }
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
  svg { 
    fill: #fff;
  }
`;
