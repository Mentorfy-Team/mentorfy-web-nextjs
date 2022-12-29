import { Global } from '@emotion/react';
import { css } from '@mui/material/styles';

const globalStyles = css`
  & :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset !important;
    -webkit-text-fill-color: white !important;
  }
  & autofill {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset;
    -webkit-text-fill-color: white !important;
  }
  & :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset;
    -webkit-text-fill-color: white !important;
  }
  .MuiDialog-paper {
    background-color: transparent;
    max-width: 100%;
    @media (max-width: 490px) {
      position: absolute;
      bottom: -34;
      width: 100%;
    }
  }
  .Popover-menu {
    .MuiPaper-elevation {
      top: 45px !important;
      right: 35px !important;
    }
  }
  .Mui-disabled {
    color: rgb(255 255 255 / 44%) !important;
    font-weight: 300 !important;

    svg {
      path {
        fill: rgb(255 255 255 / 44%) !important;
      }
    }
  }
  .MuiPopover-paper {
    box-shadow: -4px 4px 0px 0px #00000000;
  }
  button:disabled {
    opacity: 0.5;
    div {
      color: white;
    }
  }
  @media (min-width: 600px) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    ::-webkit-scrollbar-track {
      border: 1px solid #4d4d4d36;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: 100px;
      background-color: #4d4d4d36;
      background-clip: content-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #4d4d4d36;
    }
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  }
  html {
  }
  body {
    overflow: auto;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
  }
  h1 {
    line-height: 2.4rem;
    @media (max-width: 500px) {
      line-height: 2rem;
      font-size: 1.7rem;
    }
  }
  label,
  p,
  b,
  input {
  }
  button,
  input &:active,
  &:focus,
  &:focus-within,
  &:hover,
  &:visited {
    outline: none;
  }
  img {
    display: block;
  }
`;

export function GlobalStyles() {
  return <Global styles={(theme: any) => globalStyles} />;
}
