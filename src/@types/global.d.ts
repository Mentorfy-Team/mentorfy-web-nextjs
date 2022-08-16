import {HTMLInputTypeAttribute} from 'react';
import {PluginCallbacksOnSetArgument, State} from '@hookstate/core';
import {AxiosRequestConfig} from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

declare global {
  namespace ExternalModules {
    namespace Axios {
      export type {AxiosRequestConfig};
    }
    namespace Next {
      export type {NextApiRequest, NextApiResponse};
    }
    namespace React {
      export type {HTMLInputTypeAttribute};
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_IP_API_URL: string;
    }
  }
}
