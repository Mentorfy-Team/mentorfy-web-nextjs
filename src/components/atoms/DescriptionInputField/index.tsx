/* eslint-disable no-restricted-imports */
import { FC } from 'react';
import { Theme } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { MUIStyledCommonProps } from '@mui/system';
import { TextField } from './styles';

const DescriptionInputField: FC<TextFieldProps & MUIStyledCommonProps<Theme>> = (
  props,
) => {
  return (
    <TextField
      multiline
      maxRows={4}
      color="secondary"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};

export default DescriptionInputField;
