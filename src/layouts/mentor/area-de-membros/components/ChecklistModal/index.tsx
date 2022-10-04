import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider  from '@mui/material/Divider';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import Task, { TaskObject } from './components/Task';
import { AddTaskButton } from './styles';

const ChecklistModal = ({ open, setOpen, data: {
  data,
  title: titleData,
  description: descriptionData,
}, onChange }) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [tasks, setTasks] = useState<TaskObject[]>(data || [
    {
      id: '0',
      title: 'Minha tarefa 1',
      rows: [{
        id: 0,
        title: 'Minha subtarefa 1',
      }]
    }
  ]);

  const addNewTask = () => {
    const newTask = {
      id: Math.random() + '',
      title: '',
      rows: [{
        id: 0,
        title: '',
      }],
    };
    setTasks([...tasks, newTask]);
  };

  const addNewSubTask = ({ id }) => {
    const newSubTask = {
      id: Math.random() + '',
      title: '',
    };
    setTasks((oldTasks) => {
      oldTasks.find(_task => _task.id === id).rows.push(newSubTask);
      return [...oldTasks];
    });
  };

  const onTitleChange = (_title: string, id: string) => {
    setTasks(oldTasks => {
      oldTasks.find(_task => _task.id === id).title = _title;
      return [...oldTasks];
    });
  };

  const onSubtaskTitleChange = (_title: string, task_id: string, id: string) => {
    setTasks(oldTasks => {
      oldTasks.find(_task => _task.id === task_id).rows.find(_subtask => _subtask.id === id).title = _title;
      return [...oldTasks];
    });
  };

  const deleteSubtask = (task_id: string, id: string) => {
    setTasks(oldTasks => {
      oldTasks.find(_task => _task.id === task_id).rows.filter(subtask => subtask.id !== id);
      return [...oldTasks];
    });
  };

  return (
    <ModalComponent open={open} setOpen={setOpen} onSave={() => onChange({
      title,
      description,
      tasks,
    })} title="Checklist">
      <>
        <InputField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Título"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <DescriptionInputField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Descrição"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna."
        />
        <ContentBox>
          {tasks.map((task) => (
            <Task
              key={task.id}
              data={task}
              onSaveTask={(_title, id) => onTitleChange(_title, id)}
              onSaveSubtask={(_title, task_id, id) => onSubtaskTitleChange(_title, task_id, id)}
              onAddNewSubtask={(task) => addNewSubTask(task)}
              onDeleteSubtask={(task_id, id) => deleteSubtask(task_id, id)}
              onAddNewTask={() => addNewTask()}
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
            <Divider
              orientation="vertical"
              sx={(theme) => ({
                borderColor: `${theme.palette.caption.main}`,
                height: '0.6rem',
                marginTop: '1.7rem',
              })}
            />
            <AddTaskButton onClick={() => addNewTask()}>+ Adicionar Tarefa</AddTaskButton>
          </Box>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default ChecklistModal;
