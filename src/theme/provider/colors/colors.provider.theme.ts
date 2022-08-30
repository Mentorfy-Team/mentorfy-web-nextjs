import { PaletteOptions } from '@mui/material';
import { darken, lighten } from 'polished';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: Palette['primary'];
    failure: Palette['primary'];
    caption: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    accent: PaletteOptions['primary'];
    failure: PaletteOptions['primary'];
    caption: PaletteOptions['primary'];
  }
}

const primary = '#1C1B20';
const secondary = '#7586EC';
const tertiary = '#7D7D7D';
const accent = '#FE7D22';

export const colors: PaletteOptions = {
  mode: 'light',
  text: { primary: '#FFFFFF', secondary: '#000000' },
  info: { main: '#FE7D22' },
  success: { main: '#66cd80' },
  warning: { main: '#f9d652' },
  failure: { main: '#cc0000' },
  caption: { main: '#7D7D7D', dark: '#36353A' },
  primary: {
    light: '#29282D',
    main: primary,
    dark: darken(0.2, primary),
  },
  secondary: {
    light: lighten(0.2, secondary),
    main: secondary,
    dark: darken(0.2, secondary),
  },
  tertiary: {
    light: lighten(0.2, tertiary),
    main: tertiary,
    dark: darken(0.2, tertiary),
  },
  accent: {
    light: lighten(0.2, accent),
    main: accent,
    dark: darken(0.2, accent),
  },
};

// export const Colors: PaletteOptions ={
//   text,
//   info,
//   success,
//   warning,
//   failure,
//   palette: {
//     black: '#000000',
//     blue: '#47a8f6',
//     green: '#66cd80',
//     red: '#eb3447',
//     white: '#ffffff',
//     primary: {
//       light: lighten(0.2, primary),
//       main: primary,
//       dark: darken(0.2, primary),
//
//     },
//     secondary: {
//       light: lighten(0.2, secondary),
//       main: secondary,
//       dark: darken(0.2, secondary),
//       contrast: '#ffffff',
//     },
//     tertiary: {
//       light: lighten(0.2, tertiary),
//       main: tertiary,
//       dark: darken(0.2, tertiary),
//       contrast: '#ffffff',
//     },
//     accent: {
//       light: lighten(0.2, accent),
//       main: accent,
//       dark: darken(0.2, accent),
//       contrast: '#000000',
//     },
//   },
// };
