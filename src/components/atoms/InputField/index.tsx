import { FC } from 'react';
import { TextFieldProps, Theme } from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';
import { TextField } from './styles';

const InputField: FC<TextFieldProps & MUIStyledCommonProps<Theme>> = (
  props,
) => {
  return (
    <TextField
      color="accent"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};

export default InputField;
