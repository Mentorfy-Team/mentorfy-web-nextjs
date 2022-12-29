import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// ? Styled Material UI TextField Component
export const CssTextField = styled(TextField)`
  width: 100%;

  input {
    color: #000 !important;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px
      ${({ theme }) => theme.palette.primary.main}11 inset !important;
    box-shadow: 0 0 0 30px ${({ theme }) => theme.palette.primary.main}11 inset !important;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #000 !important;
  }

  & label.Mui-focused {
    color: #5e5b5d;
    font-weight: 400;
  }
  & .MuiInputBase-input {
    border-color: #c8d0d4;
  }
  & .MuiInput-underline:after {
    border: none;
  }
  & .MuiOutlinedInput-root {
    &.Mui-error {
      & .MuiOutlinedInput-notchedOutline {
        border-color: #d32f2f;
      }
    }
    & fieldset {
      border-color: #c8d0d4;
      border-radius: 4px;
    }
    &:hover fieldset {
      border: 1px solid ${({ theme }) => theme.palette.accent.main}55;
    }
    &.Mui-focused fieldset {
      border: 1px solid ${({ theme }) => theme.palette.accent.main};
    }
  }
`;
