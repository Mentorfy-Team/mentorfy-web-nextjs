import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  AddSTButton,
  DeleteButton,
  SaveButton,
  TaskField,
  TaskTypography,
  TaskWrapper,
} from '../styles';
import Subtask from './Subtask';

type Props = {
  data: TaskObject;
  onSaveTask: (_title: string, id: string) => void;
  onSaveSubtask: (_title: string, task_id: string, id: string) => void;
  onAddNewSubtask: (data: TaskObject) => void;
  onDeleteSubtask: (task_id: string, id: string) => void;
  onDeleteTask: (id: string) => void;
};
export type TaskObject = {
  id: string;
  title: string;
  rows: TaskRow[];
};

export type TaskRow = {
  id: string;
  title: string;
};

const Task: React.FC<Props> = ({
  data: task,
  onSaveTask,
  onSaveSubtask,
  onAddNewSubtask,
  onDeleteSubtask,
  onDeleteTask,
}) => {
  const [openSubTask, setOpenSubTask] = React.useState(false);
  const [canEdit, setCanEdit] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);
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
            />
            <SaveButton
              style={{ height: '24px' }}
              onClick={() => {
                if (!title) {
                  setError(true);
                } else {
                  setCanEdit(false);
                  onSaveTask(title, task.id);
                }
              }}
            >
              Salvar
            </SaveButton>
            <DeleteButton
              style={{ height: '24px' }}
              onClick={() => {
                setCanEdit(false);
                onDeleteTask(task.id);
                // TODO: Delete subtask
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
      <Box sx={{ width: '92%', alignSelf: 'flex-end' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '0.6rem',
          }}
        >
          {openSubTask ? (
            <IconButton
              sx={{ color: 'gray', width: '5px', height: '9px' }}
              onClick={() => setOpenSubTask(false)}
            >
              <ExpandMoreIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ color: 'gray', width: '5px', height: '9px' }}
              onClick={() => setOpenSubTask(true)}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 'small' }} />
            </IconButton>
          )}
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: '400',
              marginLeft: '0.7rem',
              cursor: 'pointer',
            }}
            onClick={() => setOpenSubTask(!openSubTask)}
          >
            Subtarefas ( {task.rows.length} )
          </Typography>
        </Box>
        {openSubTask ? (
          <Box>
            {task.rows.map((subtask) => (
              <Subtask
                key={subtask.id}
                task_id={task.id}
                onSaveSubtask={onSaveSubtask}
                onDeleteSubtask={onDeleteSubtask}
                data={subtask}
              />
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                textAlign: 'end',
              }}
            >
              <AddSTButton onClick={() => onAddNewSubtask(task)}>
                + Nova Subtarefa
              </AddSTButton>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

export default Task;
