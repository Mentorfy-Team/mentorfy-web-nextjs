import { css, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export const TabWrapper = styled(Tabs)`
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

  .MuiTabs-scroller {
    position: fixed;
    max-width: 390px;
  }

  .MuiTabs-indicator {
    border-bottom: 2px solid #7586ec;
  }

  button {
    align-items: flex-start;
    display: flex;
    margin-left: 1rem;
    padding: 0;
  }
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
