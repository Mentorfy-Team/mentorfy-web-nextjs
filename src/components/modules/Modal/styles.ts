import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled} from '@mui/material/styles';

export const Modal = styled(Dialog)`
  
`;
export const ModalDialogContent = styled(DialogContent)`
    background-color: #121212;
    height: 550px;
    overflow: auto;
    width: 480px;
`;
export const Header = styled(Box)`
    align-items: center;
    background-color: #1e1e1e;
    display: flex;
    height: 72px;
    justify-content: space-between;
`;

export const ModalDialogTitle = styled(DialogTitle)`
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.8rem;
`;
