import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { css, styled } from '@mui/material/styles';

type Props = {
  isMentorado?: boolean;
  popularProduct?: boolean;
};

export const Modal = styled(Dialog)<Props>`
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
      }
    `}
`;

export const ModalDialogContent = styled(DialogContent)<Props>`
  background-color: ${({ theme }) => theme.palette.primary.main};
  overflow-x: hidden;
  overflow-y: auto;
  ${({ isMentorado }) =>
    isMentorado
      ? css`
          .MuiDialogContent-root {
            overflow: hidden;
            padding: 0.5rem 1rem;
            width: 900px;
          }
        `
      : css`
          width: 480px;
        `}

  ${({ popularProduct }) =>
    popularProduct &&
    css`
      background-color: #080808;
      height: 100%;
      overflow: hidden;
      padding: 0;
      width: 900px;
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
