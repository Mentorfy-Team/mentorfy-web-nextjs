import { css, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

type Props = {
  withborder?: boolean;
  forpage?: boolean;
  hasmargintop?: boolean;
};

export const TabWrapper = styled(Tabs)<Props>`
  margin-bottom: 1rem;
  margin-top: -7px;
  ${({ hasmargintop }) =>
    hasmargintop &&
    css`
      margin-top: 50px;
    `}
  * {
    color: white !important;
  }
  ${({ withborder }) =>
    withborder &&
    css`
      .MuiButtonBase-root {
        border-bottom: 2px solid #e5e5e5;
      }
    `}

  .Mui-selected {
    border-bottom: 2px solid #7586ec;
  }

  .MuiTabs-indicator {
    border-bottom: 2px solid #7586ec;
  }

  .MuiTabs-scroller {
    max-width: 390px;
    position: fixed;
  }

  min-height: 2.8rem;
  button {
    align-items: flex-start;
    display: flex;
    min-width: 0px;
    padding: 0;
  }

  ${({ forpage, theme }) =>
    forpage &&
    css`
      border-bottom: 1px dashed #363739;
      padding-left: 2rem;

      .Mui-selected {
        border-bottom: 2px solid transparent;
        color: ${theme.palette.accent.main} !important;
      }

      .MuiTabs-indicator {
        border-bottom: 2px solid transparent;
      }
    `}
`;

export const TabItem = styled(Tab)`
  border-bottom: 3px solid transparent;
  border-top: 3px solid transparent;
  font-size: 0.8rem;
  font-style: normal;

  font-weight: 500;

  line-height: 0.8rem;
  text-transform: none;
  transition: 0.3s;
`;
