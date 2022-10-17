import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { css, styled } from '@mui/material/styles';

type Props = {
  isMentorado?: boolean;
 }

export const Modal = styled(Dialog)<Props>` 
    ${({isMentorado}) => isMentorado && css`
    .css-1hg2taq-MuiPaper-root-MuiDialog-paper  { 
      max-height: 690px;
      max-width: 900px;
      overflow: unset;
    }
  `}
`;

export const ModalDialogContent = styled(DialogContent)<Props>`
  background-color: #121212;
  
  ${({isMentorado}) => isMentorado ? css`
      max-height: 700px;
      max-width: 900px;
      overflow-y: inherit;
      padding: 1rem;   
    ` : css`
    width: 480px;
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
