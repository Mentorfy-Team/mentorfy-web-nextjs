import { FC } from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { colors } from './colors/colors.provider.theme';
import { MuiOverride } from './MuiOverride';

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  let Theme = createTheme({
    palette: colors,
  });

  Theme = responsiveFontSizes(Theme);
  Theme.components = MuiOverride as any;

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Provider;
