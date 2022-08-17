import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import colorsProviderTheme from './provider/colors/colors.provider.theme';

export * from './global/global.theme';
export { default as ThemeProvider } from './provider/provider.theme';

type colorsNames = keyof typeof colorsProviderTheme;

export function getColor(color: colorsNames) {
  return `$${color}`;
}
