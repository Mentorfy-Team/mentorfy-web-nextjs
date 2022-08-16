
import {darken, lighten} from 'polished';

// Mainly for buttons.
const primary = '#2e2f30';

// TODO: Confirm the colors bellow.
const secondary = '#eb3447';
const tertiary = '#616161';
const accent = '#fff8e6';

// General purpose.
const text = '#000000';
const info = '#47a8f6';
const success = '#66cd80';
const warning = '#f9d652';
const failure = '#cc0000';

export default {
  text,
  info,
  success,
  warning,
  failure,
  palette: {
    black: '#000000',
    blue: '#47a8f6',
    green: '#66cd80',
    red: '#eb3447',
    white: '#ffffff',
  },
  primary: {
    light: lighten(0.2, primary),
    main: primary,
    dark: darken(0.2, primary),
    contrast: '#ffffff',
  },
  secondary: {
    light: lighten(0.2, secondary),
    main: secondary,
    dark: darken(0.2, secondary),
    contrast: '#ffffff',
  },
  tertiary: {
    light: lighten(0.2, tertiary),
    main: tertiary,
    dark: darken(0.2, tertiary),
    contrast: '#ffffff',
  },
  accent: {
    light: lighten(0.2, accent),
    main: accent,
    dark: darken(0.2, accent),
    contrast: '#ffffff',
  },
};
