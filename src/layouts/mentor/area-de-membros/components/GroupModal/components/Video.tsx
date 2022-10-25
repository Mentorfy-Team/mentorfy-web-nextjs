import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import {
  DeleteButton,
  SaveButton,
  TaskField,
  TaskTypography,
  TaskWrapper,
} from '../styles';

type Props = {
  data: {
    id: string;
    title: string;
    description: string;
  };
  onSaveTask: (id: string, _title: string, _description) => void;
  onDeleteTask: (id: string) => void;
};

const Task: React.FC<Props> = ({ data: task, onSaveTask, onDeleteTask }) => {
  const [canEdit, setCanEdit] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [error, setError] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #424242',
        margin: '0 0 1rem 0',
        paddingBottom: '1rem',
      }}
      key={task.id}
    >
      <TaskWrapper>
        <MenuIcon />
        {canEdit ? (
          <>
            <TaskField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Título"
              placeholder="Lorem ipsum in dolor win"
              error={error && !title}
              sx={{
                marginLeft: '0.7rem',
              }}
            />
            <SaveButton
              style={{ height: '24px' }}
              onClick={() => {
                if (!title) {
                  setError(true);
                } else {
                  onSaveTask(task.id, title, description);
                  setCanEdit(false);
                }
              }}
            >
              Salvar
            </SaveButton>
            <DeleteButton
              style={{ height: '24px' }}
              onClick={() => {
                onDeleteTask(task.id);
                setCanEdit(false);
              }}
            >
              Excluir
            </DeleteButton>
          </>
        ) : (
          <>
            <TaskTypography>{task.title}</TaskTypography>
            <SaveButton
              style={{ height: '24px' }}
              onClick={() => {
                setCanEdit(true);
              }}
            >
              Editar
            </SaveButton>
          </>
        )}
      </TaskWrapper>
    </Box>
  );
};

export default Task;
