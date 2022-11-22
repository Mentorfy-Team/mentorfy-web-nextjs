import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import {
  ButtonsWrapper,
  Header,
  Modal,
  ModalDialogContent,
  ModalDialogTitle,
} from './styles';
import { useTheme } from '@mui/material/styles';

type props = {
  children?: JSX.Element | JSX.Element[];
  title?: JSX.Element | string;
  withoutSave?: boolean;
  open?: boolean;
  isMentorado?: boolean;
  deleteMessage?: boolean;
  popularProduct?: boolean;
  setOpen?: (value: boolean) => void;
  onSave?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
  id?: string;
  isBlocked?: boolean;
  withX?: boolean;
};

const ModalComponent: FC<props> = ({
  children,
  title,
  withoutSave = false,
  open,
  isMentorado,
  deleteMessage,
  popularProduct,
  setOpen,
  onSave,
  onClose,
  onDelete,
  id,
  isBlocked = false,
  withX = true,
}) => {
  const theme = useTheme();

  return (
    <Modal
      id={id ? id : `${Math.random() * 1000}`}
      open={open}
      onClose={() => setOpen(false)}
      isMentorado={isMentorado}
      popularProduct={popularProduct}
    >
      {popularProduct ? (
        ''
      ) : (
        <Header
          sx={{
            justifyContent: withX ? 'space-between' : 'center',
          }}
        >
          <ModalDialogTitle>{title}</ModalDialogTitle>
          {withX && (
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </Header>
      )}
      <ModalDialogContent
        isMentorado={isMentorado}
        popularProduct={popularProduct}
        id="dialog"
      >
        {children}
        <ButtonsWrapper>
          {onSave && (
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                float: 'right',
                width: '40%',
                margin: '1rem 0 0 auto',
                height: '2.5rem',
                backgroundColor: `${deleteMessage ? '' : 'green'}`,
                color: 'white',
              }}
              disabled={isBlocked}
              onClick={() => onSave()}
            >
              {deleteMessage ? 'Cancelar' : 'Salvar'}
            </Button>
          )}
          {onClose && (
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                width: '40%',
                margin: '1rem 0 0 auto',
                height: '2.5rem',
                color: theme.palette.accent.main,
              }}
              disabled={isBlocked}
              onClick={() => onClose()}
            >
              Fechar
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                float: 'left',
                width: '40%',
                margin: '1rem 0 0 auto',
                color: `${deleteMessage ? 'white' : 'gray'}`,
                backgroundColor: `${deleteMessage && 'red'}`,
                fontWeight: '300',
                height: '2.5rem',
              }}
              disabled={isBlocked}
              onClick={() => onDelete()}
            >
              Excluir
            </Button>
          )}
        </ButtonsWrapper>
      </ModalDialogContent>
    </Modal>
  );
};

export default ModalComponent;
