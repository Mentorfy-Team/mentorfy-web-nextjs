import { styled } from '@mui/material/styles';
import txtFiled from '@mui/material/TextField';

export const PasteCodeField = styled(txtFiled)`
  height: 150px;
  margin: 1rem 0;
  width: 100%;

  @media (max-width: 500px) {
    margin: 1rem 0;
  }

  .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root { 
    align-items: flex-start;
    height: 100px;
  }

  .MuiFormLabel-root {
    color: white;
  }

  .MuiInputBase-root {
    fieldset {
      border: 1px solid white;
      border-color: grey;
      height: 150px;
    }
    
    fieldset:focus {
      border: 1px solid white;
    }
}
  
`;
