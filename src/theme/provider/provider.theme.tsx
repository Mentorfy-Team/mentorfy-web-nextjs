import { FC, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import colorsTheme from './colors/colors.provider.theme';

declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colorsTheme;
  }
  interface ThemeOptions {
    colors?: typeof colorsTheme;
  }
}

// import {default as colors} from './colors/colors.provider.theme';
const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // for remote config
  const [themeConfig, setThemeConfig] = useState({});

  const Theme = createTheme({
    colors: colorsTheme,
  });

  return (
    <div>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </div>
  );
};

export default Provider;
