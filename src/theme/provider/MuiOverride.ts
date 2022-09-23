import { Components, ComponentsProps, Theme } from '@mui/material';

const ButtonStyle = {
  defaultProps: {
    sx: {
      height: '2.0rem',
      fontSize: '0.8rem',
      paddingBottom: '.2rem',
      textTransform: 'capitalize',
      padding: '0.2rem 1rem',
    },
    size: 'small',
  } as ComponentsProps['MuiButton'],
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      ...(ownerState.variant === 'contained' && {
        backgroundColor: theme.palette.accent.main,
      }),
      ...(ownerState.variant === 'text' && {
        color: theme.palette.accent.main,
      }),
      ...(ownerState.variant === 'outlined' && {
        color: theme.palette.accent.main,
        borderColor: theme.palette.accent.main,
        svg: {
          path: {
            fill: theme.palette.accent.main,
          },
        },
      }),
    }),
  },
};
const TextFieldStyle = {
  defaultProps: {
    size: 'small',
  } as ComponentsProps['MuiTextField'],
};
const FormControlStyle = {
  defaultProps: {
    size: 'small',
  } as ComponentsProps['MuiFormControl'],
};

export const MuiOverride: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.caption.dark,
      }),
    },
  },
  MuiButton: ButtonStyle,
  MuiTextField: TextFieldStyle,
  MuiFormControl: FormControlStyle,
};
