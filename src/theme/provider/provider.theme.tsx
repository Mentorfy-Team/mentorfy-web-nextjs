
import {FC, useState} from 'react';

import {MantineProvider} from '@mantine/core';
import {rtlCache} from '~/rtl-cache';
// import {default as colors} from './colors/colors.provider.theme';
const Provider: FC<{children:React.ReactNode}> = ({children}) => {

  // for remote config
  const [ themeConfig, setThemeConfig ] = useState({});

  return(
    <div dir="rtl">
  <MantineProvider
  withGlobalStyles
  withNormalizeCSS
  emotionCache={rtlCache}
  theme={{
      colorScheme: 'dark',
      dir: 'rtl',
      ...themeConfig,
    }}>
    {children}
  </MantineProvider>
  </div>
);};

export default Provider;
