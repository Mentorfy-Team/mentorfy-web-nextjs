import { FC, useState } from 'react';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { colors } from './colors/colors.provider.theme';

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // for remote config
  //const [themeConfig, setThemeConfig] = useState({});

  let Theme = createTheme({
    palette: colors,
  });
  Theme = responsiveFontSizes(Theme);
  Theme.components = {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.caption.dark,
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          height: '3rem',
          paddingBottom: '.2rem',
        },
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'contained' && {
            backgroundColor: theme.palette.accent.main,
            fontWeight: 'bold',
          }),
          ...(ownerState.variant === 'text' && {
            color: theme.palette.accent.main,
            fontWeight: 'bold',
          }),
          ...(ownerState.variant === 'outlined' && {
            color: theme.palette.accent.main,
            borderColor: theme.palette.accent.main,
            fontWeight: 'bold',
          }),
        }),
      },
    },
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Provider;
