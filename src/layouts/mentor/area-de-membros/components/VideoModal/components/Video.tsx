import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { TaskObject } from '..';
import {
  DeleteButton,
  SaveButton,
  TaskField,
  TaskTypography,
  TaskWrapper,
} from '../styles';

type Props = {
  data: TaskObject;
  onSaveTask: (id: string, _title: string, _description, _link) => void;
  onDeleteTask: (id: string) => void;
};

const Task: React.FC<Props> = ({ data: task, onSaveTask, onDeleteTask }) => {
  const [canEdit, setCanEdit] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [link, setLink] = React.useState(task.link);
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
                  onSaveTask(task.id, title, description, link);
                  setCanEdit(false);
                }
              }}
            >
              Salvar
            </SaveButton>
            <DeleteButton
              style={{ height: '24px' }}
              onClick={() => {
                console.log('delete', task.id);
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
      {canEdit && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TaskField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição"
            placeholder="..."
            error={error && !description}
          />
          <TaskField
            value={link}
            onChange={(e) => setLink(e.target.value)}
            label="Link"
            placeholder="ex: https://www.youtube.com/watch?v=1"
            error={error && !link}
          />
        </Box>
      )}
    </Box>
  );
};

export default Task;
