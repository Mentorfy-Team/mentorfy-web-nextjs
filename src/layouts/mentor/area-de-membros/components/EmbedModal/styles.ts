import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import txtFiled from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const PasteCodeField = styled(txtFiled)`
  margin: 1rem 0;
  position: relative;
  width: 100%;
  @media (max-width: 500px) {
    margin: 1rem 0;
  }

  .MuiInputBase-multiline {
  }
  .MuiOutlinedInput-input {
    align-self: flex-start;
  }

  .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root {
    align-items: flex-start;
  }

  .MuiFormLabel-root {
    color: white;
  }

  .MuiInputBase-root {
    fieldset {
      border: 1px solid white;
      border-color: grey;
      overflow: hidden;
    }

    fieldset:focus {
      border: 1px solid white;
    }
  }
`;

export const UploadTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1rem;
  margin-top: 0.75rem;
`;

export const P = styled('p')`
  color: ${({ theme }) => theme.palette.caption.dark};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.75rem;
`;

export const PlaceHolderBox = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: calc(50% - 70px);
  position: absolute;
  top: calc(25% + 10px);
`;
