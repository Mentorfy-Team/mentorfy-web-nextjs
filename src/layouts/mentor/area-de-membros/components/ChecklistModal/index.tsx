import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import Task, { TaskObject } from './components/Task';
import { AddTaskButton } from './styles';

const ChecklistModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  readOnly,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [tasks, setTasks] = useState<TaskObject[]>(
    taskData || [
      {
        id: '0',
        title: 'Minha tarefa 1',
        rows: [
          {
            id: '0',
            title: 'Minha subtarefa 1',
          },
        ],
      },
    ],
  );

  const addNewTask = useCallback(() => {
    const newTask = {
      id: Math.random() + '',
      title: 'Nova tarefa ' + (tasks.length + 1),
      rows: [],
    };
    setTasks([...tasks, newTask]);
  }, [tasks]);

  const addNewSubTask = ({ id }) => {
    const newSubTask = {
      id: Math.random() + '',
      title: '',
    };
    setTasks((oldTasks) => {
      oldTasks.find((_task) => _task.id === id).rows.push(newSubTask);
      return [...oldTasks];
    });
  };

  const onTitleChange = (_title: string, id: string) => {
    setTasks((oldTasks) => {
      oldTasks.find((_task) => _task.id === id).title = _title;
      return [...oldTasks];
    });
  };

  const onSubtaskTitleChange = (
    _title: string,
    task_id: string,
    id: string,
  ) => {
    setTasks((oldTasks) => {
      oldTasks
        .find((_task) => _task.id === task_id)
        .rows.find((_subtask) => _subtask.id === id).title = _title;
      return [...oldTasks];
    });
  };

  const deleteSubtask = (id: string, task_id: string) => {
    setTasks((oldTasks) => {
      const tsi = oldTasks.findIndex((_task) => _task.id === task_id);
      const rows = oldTasks[tsi].rows.filter((_subtask) => _subtask.id !== id);
      oldTasks[tsi].rows = rows;
      return [...oldTasks];
    });
  };

  const onDeleteTask = (task_id: string) => {
    setTasks((oldTasks) => {
      const ts = oldTasks.filter((_task) => _task.id !== task_id);
      return [...ts];
    });
  };

  const handleSave = (del?: boolean) => {
    const filterEmpty = tasks
      .filter((task) => task.title)
      .map((task) => {
        const rows = task.rows.filter((row) => row.title);
        return {
          ...task,
          rows,
        };
      });
    onChange({
      title,
      description,
      data: filterEmpty,
      delete: del,
    });
    setOpen(false);
  };

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      onSave={readOnly ? null : () => handleSave()}
      onDelete={readOnly ? null : () => handleSave(true)}
      onClose={readOnly ? () => setOpen(false) : null}
      title="Checklist"
    >
      <>
        <Box sx={{ width: '100vw' }} />
        <InputField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="T??tulo"
        />
        <DescriptionInputField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Descri????o"
        />
        <ContentBox>
          {tasks.map((task) => (
            <Task
              key={task.id}
              data={task}
              onSaveTask={(_title, id) => onTitleChange(_title, id)}
              onSaveSubtask={(_title, task_id, id) =>
                onSubtaskTitleChange(_title, task_id, id)
              }
              onAddNewSubtask={(task) => addNewSubTask(task)}
              onDeleteSubtask={(task_id, id) => deleteSubtask(task_id, id)}
              onDeleteTask={(id) => onDeleteTask(id)}
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '1.6rem',
            }}
          >
            <AddTaskButton onClick={() => addNewTask()}>
              + Nova Tarefa
            </AddTaskButton>
          </Box>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default ChecklistModal;
