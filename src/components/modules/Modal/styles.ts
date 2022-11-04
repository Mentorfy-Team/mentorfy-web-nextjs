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
      .css-1hg2taq-MuiPaper-root-MuiDialog-paper {
        height: fit-content;
        max-height: calc(100% - 5rem);
        max-width: 900px;
        overflow: unset;
      }
      @media (max-width: 600px) {
        .css-1hg2taq-MuiPaper-root-MuiDialog-paper {
          height: 100%;
          max-height: 100%;
        }
      }
    `}
  ${({ popularProduct }) =>
    popularProduct &&
    css`
      .css-1hg2taq-MuiPaper-root-MuiDialog-paper {
        background-color: #121212;
        max-height: 100%;
        max-width: 900px;
      }
      
    `}
`;

export const ModalDialogContent = styled(DialogContent)<Props>`
  background-color: ${({theme}) => theme.palette.primary.main};
  ${({ isMentorado }) =>
    isMentorado
      ? css`
          max-width: 900px;
          overflow-y: auto;
          padding: 1rem;
        `
      : css`
          width: 480px;
        `}

  ${({ popularProduct }) =>
    popularProduct
      && css`
      background-color: #080808;
          height: 100%;
          overflow: hidden;
          padding: 0;
          width: 800px;
        `
      }
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
