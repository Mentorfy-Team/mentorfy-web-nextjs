import { Components, ComponentsProps, Theme } from '@mui/material';

const ButtonStyle = {
  defaultProps: {
    sx: {
      height: '2.0rem',
      fontSize: '0.8rem',
      paddingBottom: '.2rem',
      textTransform: 'capitalize',
      padding: '1.1rem 1rem',
    },
    size: 'small',
  } as ComponentsProps['MuiButton'],
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      fontWeight: 600,
      p: {
        fontWeight: 600,
      },
      ...(ownerState.variant === 'contained' && {
        backgroundColor: theme.palette.accent.main,
      }),
      ...(ownerState.variant === 'text' && {
        color: theme.palette.accent.main,
      }),
      ...(ownerState.variant === 'outlined' && {
        color: theme.palette.accent.main,
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
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
    sx: {},
  } as ComponentsProps['MuiTextField'],
  styleOverrides: {
    root: {
      input: {
        height: '1.8rem',
      },
    },
  } as Components['MuiTextField']['styleOverrides'],
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
        backgroundColor: theme.palette.primary.light,
      }),
    },
  },
  MuiButton: ButtonStyle,
  MuiTextField: TextFieldStyle,
  MuiFormControl: FormControlStyle,
};