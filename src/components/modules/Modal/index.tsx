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
  onDelete?: () => void;
};

const ModalComponent: FC<props> = ({
  children,
  title,
  withoutSave = false,
  open,
  setOpen,
  onSave,
  onDelete,
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
        {onSave && (
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              float: 'right',
              width: '40%',
              marginTop: '1rem',
              height: '2.5rem',
              backgroundColor: 'green',
              color: 'white',
            }}
            onClick={() => onSave()}
          >
            Salvar
          </Button>
        )}
        {onDelete && (
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              float: 'left',
              width: '40%',
              marginTop: '1rem',
              color: 'gray',
              fontWeight: '300',
              height: '2.5rem',
            }}
            onClick={() => onDelete()}
          >
            Excluir
          </Button>
        )}
      </ModalDialogContent>
    </Modal>
  );
};

export default ModalComponent;
