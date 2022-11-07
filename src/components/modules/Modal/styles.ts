import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
        max-height: 100%;
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
  justify-content: space-between;
`;

export const ModalDialogTitle = styled(DialogTitle)`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1rem;
`;
