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
  Theme.components.MuiButton = {
    defaultProps: {
      sx: {
        height: '3rem',
        paddingBottom: '.2rem',
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
