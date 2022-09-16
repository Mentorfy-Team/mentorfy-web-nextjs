import { Global } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={(theme: any) => ({
        '.MuiDialog-paper': {
          backgroundColor: 'transparent',
          '@media (max-width: 490px)': {
            position: 'absolute',
            bottom: -34,
            width: '100%',
          },
        },
        '.MuiPopover-paper': {
          boxShadow: '-4px 4px 0px 0px #00000000',
        },
        'button:disabled': {
          backgroundColor: '#9e9e9e',
          borderRadius: '5px',
          color: 'rgb(255 255 255 / 26%)',
        },
        '@media (min-width: 600px)': {
          '::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '::-webkit-scrollbar-track': {
            border: '1px solid #6e6e6e',
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#6e6e6e',
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#6e6e6e',
          },
          '*, *:before, *:after': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
        },
        body: {
          fontFamily: '"Roboto", sans-serif',
          overflow: 'auto',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: '"Roboto", sans-serif',
        },
        h1: {
          lineHeight: '2.4rem',
          '@media (max-width: 500px)': {
            lineHeight: '2.0rem',
            fontSize: '1.7rem',
          },
        },
        'label, p, input': {
          fontFamily: '"Open Sans", "sans-serif"',
        },
        'button, input &:active, &:focus, &:focus-within, &:hover, &:visited': {
          outline: 'none',
        },
        img: {
          display: 'block',
        },
      })}
    />
  );
}
