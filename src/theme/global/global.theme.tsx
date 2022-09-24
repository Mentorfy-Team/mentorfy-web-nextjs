import { Global } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={(theme: any) => ({
        '& :-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #242424 inset',
          WebkitTextFillColor: 'white !important',
        },
        '& :-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0 1000px #242424 inset',
          WebkitTextFillColor: 'white !important',
        },
        '.MuiDialog-paper': {
          backgroundColor: 'transparent',
          '@media (max-width: 490px)': {
            position: 'absolute',
            bottom: -34,
            width: '100%',
          },
        },
        '.Popover-menu': {
          '.MuiPaper-elevation': {
            top: '45px !important',
            right: '35px !important',
          },
        },
        '.MuiPopover-paper': {
          boxShadow: '-4px 4px 0px 0px #00000000',
        },
        'button:disabled': {
          opacity: '0.5',
          div: {
            color: 'white',
          },
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
