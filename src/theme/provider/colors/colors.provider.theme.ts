import { PaletteOptions } from '@mui/material/styles';

const primary = '#121212';
const secondary = '#7586EC';
const tertiary = '#7D7D7D';
const accent = '#FE7D22';

export const colors: PaletteOptions = {
  mode: 'light',
  text: { primary: '#FFFFFF', secondary: '#000000' },
  info: { main: '#FFFFFF' },
  success: { main: '#66cd80' },
  warning: { main: '#f9d652' },
  failure: { main: '#cc0000' },
  caption: { main: '#7D7D7D', dark: '#363739' },
  primary: {
    light: '#1E1E1E',
    main: primary,
    dark: '#17171A',
  },
  secondary: {
    light: '#99A7F5',
    main: secondary,
    dark: '#5F6EC3',
  },
  tertiary: {
    light: '#9F9F9F',
    main: tertiary,
    dark: '#4E4E4E',
  },
  accent: {
    light: '#FF964B',
    main: accent,
    dark: '#B75917',
  },
};
