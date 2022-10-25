import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import InputField from '~/components/atoms/InputField';
import { ModalBox, Task, TaskTitle, TaskWrapper } from './styles';

const TaskBox: FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TaskWrapper>
      <Task>
        <MenuIcon />
        <TaskTitle>
          lorem ipsum in dolor win lorem ipsum ind dolor win
        </TaskTitle>
        <Button
          onClick={handleOpen}
          sx={{ textTransform: 'none', fontSize: '0.75rem' }}
        >
          Editar
        </Button>
        <Modal
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ModalBox>
            <InputField
              label="Nome da Etapa"
              placeholder="Lorem ipsum dolor win"
            ></InputField>
            <InputField
              label="Descrição"
              placeholder="Lorem ipsum dolor win"
            ></InputField>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                height: '2.5rem',
                textTransform: 'none',
                float: 'right',
                width: '40%',
              }}
            >
              Salvar
            </Button>
          </ModalBox>
        </Modal>
      </Task>
      <Button sx={{ color: `${theme.palette.caption.main}`, width: '100%' }}>
        + ADICIONAR TAREFA
      </Button>
    </TaskWrapper>
  );
};

export default TaskBox;
