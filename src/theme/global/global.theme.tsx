import { Global } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *:before, *:after': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        body: {
          fontFamily: '"Roboto", sans-serif',
          overflow: 'auto',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: '"Roboto", sans-serif',
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
