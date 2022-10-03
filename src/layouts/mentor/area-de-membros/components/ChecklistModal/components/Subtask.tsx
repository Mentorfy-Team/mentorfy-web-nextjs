import React from 'react';
import { DeleteButton, SaveButton, SubTask, SubTaskField, SubTaskTypography } from '../styles';
import { TaskRow } from './Task';

type Props = {
  data: TaskRow;
  task_id: string;
  onSaveSubtask: (_title: string, task_id: string, id: string) => void;
}

const Subtask: React.FC<Props> = ({ task_id, data: subtask, onSaveSubtask }) => {
  const [canEdit, setCanEdit] = React.useState(false);
  const [title, setTitle] = React.useState(subtask.title);

  return (
    <SubTask key={subtask.id}>
      {canEdit && (<>
        <SubTaskField value={title} onChange={(e)=> setTitle(e.target.value)} label="Descrição" id='subtask-field' />

        <SaveButton style={{ height: '24px' }} onClick={() => {
          setCanEdit(false);
          onSaveSubtask(title, task_id, subtask.id);
        }}>
          Salvar
        </SaveButton>

        <DeleteButton style={{ height: '24px' }} onClick={() => {
          setCanEdit(false);
          // TODO: Delete subtask
        }}>
          Excluir
        </DeleteButton>
      </>)}

      {!canEdit && (<>
        <SubTaskTypography>{title}</SubTaskTypography>

        <SaveButton style={{ height: '24px' }} onClick={() => {
          setCanEdit(true);
        }}>
          Editar
        </SaveButton>
      </>)}
    </SubTask>
  );
}

export default Subtask;