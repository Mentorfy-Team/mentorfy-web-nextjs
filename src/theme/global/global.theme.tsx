import { Global } from '@emotion/react';
import { css } from '@mui/material/styles';

const globalStyles = css`
  & :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset;
    -webkit-text-fill-color: white !important;
  }
  & autofill {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset;
    -webkit-text-fill-color: white !important;
  }
  & :-webkit--autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #242424 inset;
    box-shadow: 0 0 0 1000px #242424 inset;
    -webkit-text-fill-color: white !important;
  }
  .MuiDialog-paper {
    background-color: transparent;
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
    ::-webkit--scrollbar {
      width: 12px;
      height: 12px;
    }
    ::-webkit--scrollbar-track {
      border: 1px solid #6e6e6e;
      border-radius: 10px;
    }
    ::-webkit--scrollbar-thumb {
      background: #6e6e6e;
      border-radius: 10px;
    }
    ::-webkit--scrollbar-thumb:hover {
      background: #6e6e6e;
    }
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  }
  body {
    font-family: Roboto, system-ui, sans-serif;
    overflow: auto;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Roboto, system-ui, sans-serif;
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
    font-family: Roboto, system-ui, sans-serif;
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
