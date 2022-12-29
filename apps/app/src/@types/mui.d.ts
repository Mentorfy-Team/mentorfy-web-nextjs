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

declare module '@mui/material/textfield' {
  interface TextFieldPropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/inputbase' {
  interface InputBasePropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/svgicon' {
  interface SvgIconPropsColorOverrides {
    accent: true;
  }
}

export {};
