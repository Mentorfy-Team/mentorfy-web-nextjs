/* eslint-disable no-restricted-imports */
import { FC } from 'react';
import { Theme } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { MUIStyledCommonProps } from '@mui/system';
import { TextField } from './styles';

const InputField: FC<
  TextFieldProps & MUIStyledCommonProps<Theme> & { register? }
> = (props) => {
  return (
    <TextField
      color="secondary"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
      {...props.register}
    />
  );
};

export default InputField;
