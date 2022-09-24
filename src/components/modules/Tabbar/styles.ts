import { css, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

type Props = {
  withBorder?: boolean;
  forPage?: boolean;
};

export const TabWrapper = styled(Tabs)<Props>`
  margin-bottom: 1rem;
  margin-top: -7px;
  min-height: 2.8rem;
  * {
    color: white !important;
  }
  ${({ withBorder }) =>
    withBorder &&
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

  button {
    align-items: flex-start;
    display: flex;
    margin-left: 1rem;
    padding: 0;
  }

  ${({ forPage, theme }) =>
    forPage &&
    css`
      border-bottom: 1px dashed #363739;
      padding-left: 1rem;

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
