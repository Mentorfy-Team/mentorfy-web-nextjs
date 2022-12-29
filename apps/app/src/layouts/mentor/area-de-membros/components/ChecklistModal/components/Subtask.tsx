import React from 'react';
import {
  DeleteButton,
  SaveButton,
  SubTask,
  SubTaskField,
  SubTaskTypography,
} from '../styles';
import { TaskRow } from './Task';

type Props = {
  data: TaskRow;
  task_id: string;
  onSaveSubtask: (_title: string, task_id: string, id: string) => void;
  onDeleteSubtask: (task_id: string, id: string) => void;
};

const Subtask: React.FC<Props> = ({
  task_id,
  data: subtask,
  onSaveSubtask,
  onDeleteSubtask,
}) => {
  const [canEdit, setCanEdit] = React.useState(!subtask.title);
  const [title, setTitle] = React.useState(subtask.title);
  const [error, setError] = React.useState(false);

  return (
    <SubTask>
      {canEdit && (
        <>
          <SubTaskField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Subtarefa"
            error={error && !title}
          />

          <SaveButton
            style={{ height: '24px' }}
            onClick={() => {
              if (!title) {
                setError(true);
              } else {
                setCanEdit(false);
                onSaveSubtask(title, task_id, subtask.id);
              }
            }}
          >
            Salvar
          </SaveButton>

          <DeleteButton
            style={{ height: '24px' }}
            onClick={() => {
              setCanEdit(false);
              onDeleteSubtask(subtask.id, task_id);
              // TODO: Delete subtask
            }}
          >
            Excluir
          </DeleteButton>
        </>
      )}

      {!canEdit && (
        <>
          <SubTaskTypography>{title}</SubTaskTypography>

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
    </SubTask>
  );
};

export default Subtask;
