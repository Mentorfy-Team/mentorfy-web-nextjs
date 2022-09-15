import { FC } from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { colors } from './colors/colors.provider.theme';

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // for remote config
  //const [themeConfig, setThemeConfig] = useState({});

  const ButtonStyle = {
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
          svg: {
            path: {
              fill: theme.palette.accent.main,
            },
          },
        }),
      }),
    },
  };

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
    MuiButton: ButtonStyle,
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
