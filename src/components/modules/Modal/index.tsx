import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { Header, Modal, ModalDialogContent, ModalDialogTitle } from './styles';

type props = {
  children?: JSX.Element;
  title: JSX.Element | string;
}

const ModalComponent: FC<props> = ({ children, title}) => {
  const [open, setOpen] = useState(true);

  const handleClose = ()=> {
    setOpen(false);
  };
  const handleOpen = ()=> {
    setOpen(true);
  };

  return (
   <Modal open={open} onClose={handleClose}>
    <Header>
      <ModalDialogTitle>{title}</ModalDialogTitle>
      <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: 'white'}}/>
      </IconButton>
    </Header>
    <ModalDialogContent>
      {children}
    <Button variant='contained' sx={{textTransform: 'none', float: 'right', width: '40%', marginTop: '1rem'}} onClick={handleClose}>Salvar</Button>
    </ModalDialogContent>
   </Modal>
  );
};

export default ModalComponent;
