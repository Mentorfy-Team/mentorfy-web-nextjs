import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { css, styled } from '@mui/material/styles';

type Props = {
  isMentorado?: boolean;
  popularProduct?: boolean;
  maxWidthSize?: string;
};

export const Modal = styled(Dialog) <Props>`
  .MuiPaper-root {
    height: fit-content;
    max-height: 90%;
    max-width: ${({ maxWidthSize }) => maxWidthSize || '700px'};
    overflow: unset;
    @media (max-width: 600px) {
      height: 100%;
      max-height: 100%;
      max-width: 100vw;
    }
  }
  ${({ isMentorado }) =>
    isMentorado &&
    css`
      .MuiPaper-root {
        height: fit-content;
        max-height: 90%;
        max-width: 1000px;
        overflow: unset;
        @media (max-width: 600px) {
          height: 100%;
          max-height: 100%;
        }
      }
    `}
  ${({ popularProduct }) =>
    popularProduct &&
    css`
      .MuiPaper-root {
        background-color: #121212;
        max-height: 100%;
        max-width: 900px;
        @media (max-width: 900px) {
          height: auto;
          width: 100%;
    }
      }
    `}
`;

export const ModalDialogContent = styled(DialogContent) <Props>`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  ${({ isMentorado }) =>
    isMentorado
      ? css`
          .MuiDialogContent-root {
            overflow: hidden;
            overflow-y: auto;
            padding: 0.5rem 1rem;
            width: 900px;
          }
        `
      : css`
          width: 100%;
        `}

  ${({ popularProduct }) =>
    popularProduct &&
    css`
      background-color: #080808;
      height: 100%;
      overflow: hidden;
      padding: 0;
      width: 900px;
      @media (max-width: 900px) {
          height: auto;
          width: 100%;
    }
    `}
`;
export const Header = styled(Box)`
  align-items: center;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
`;

export const ModalDialogTitle = styled(Box)`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1rem;
  padding: 1rem 0.8rem;
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
