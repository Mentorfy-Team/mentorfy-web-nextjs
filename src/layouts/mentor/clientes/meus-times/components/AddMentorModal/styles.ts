import { styled } from '@mui/material/styles';
import SelectField from '~/components/atoms/SelectField';

export const AcessLevelSelectField = styled(SelectField)`
  height: 2.8rem;
  outline: none;
  width: 100%;
  input {
    font-size: 0.9rem;
    height: 0.625rem;
    color: #fff;
  }
  label {
    color: ${({ theme }) => theme.palette.text.primary} !important;
  }
  fieldset {
    border-color: #fff;

    &:focus {
      border-color: #4a538d !important;
    }
  }
  .MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }
  svg {
    fill: #ffffff;
  }
`;
