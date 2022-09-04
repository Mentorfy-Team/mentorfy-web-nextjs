import { FormControl, styled } from '@mui/material';

export const SelectFormControl = styled(FormControl)`
  text-align: left;
  svg {
    color: ${({ theme }) => theme.palette.accent.main};
  }
  > div {
    height: 42px;
  }
  .MuiFormLabel-root {
    color: white;
  }

  .Mui-focused {
    color: ${({ theme }) => theme.palette.accent.main};
  }
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.primary.main};
    fieldset {
      border: 0px solid white;
      border-color: grey;
    }
    fieldset:focus {
      border: 0px solid white;
    }
  }
`;
