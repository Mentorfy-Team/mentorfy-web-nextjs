import { HTMLInputTypeAttribute } from 'react';
import { ApiError, Session, User } from '@supabase/supabase-js';
import { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from './supabase/v2';

declare global {
  namespace ExternalModules {
    namespace Supabase {
      export type { User, Session, ApiError, Database };
    }
    namespace Axios {
      export type { AxiosRequestConfig };
    }
    namespace Hookstate {
      export type { State, PluginCallbacksOnSetArgument };
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
      NEXT_PUBLIC_APP_DOCS_URL: string;
      NEXT_PUBLIC_IP_API_URL: string;
    }
  }
}
