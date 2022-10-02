import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { Header, Modal, ModalDialogContent, ModalDialogTitle } from './styles';

type props = {
  children?: JSX.Element | JSX.Element[];
  title: JSX.Element | string;
  withoutSave?: boolean;
  open?: boolean;
  setOpen: (value: boolean) => void;
  onSave?: () => void;
};

const ModalComponent: FC<props> = ({
  children,
  title,
  withoutSave = false,
  open,
  setOpen,
  onSave,
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Header>
        <ModalDialogTitle>{title}</ModalDialogTitle>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      </Header>
      <ModalDialogContent>
        {children}
        {!withoutSave && (
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              float: 'right',
              width: '40%',
              marginTop: '1rem',
            }}
            onClick={() => onSave()}
          >
            Salvar
          </Button>
        )}
      </ModalDialogContent>
    </Modal>
  );
};

export default ModalComponent;
