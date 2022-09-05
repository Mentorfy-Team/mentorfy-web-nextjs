import { HTMLInputTypeAttribute } from 'react';
import { PluginCallbacksOnSetArgument, State } from '@hookstate/core';
import { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

declare global {
  namespace ExternalModules {
    namespace Axios {
      export type { AxiosRequestConfig };
    }
    namespace Next {
      export type { NextApiRequest, NextApiResponse };
    }
    namespace React {
      export type { HTMLInputTypeAttribute };
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_IP_API_URL: string;
    }
  }
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
}
