import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import {
  AddSTButton,
  DeleteButton,
  SaveButton,
  SubTask,
  SubTaskField,
  SubTaskTypography,
  TaskField,
  TaskTypography,
  TaskWrapper,
} from './styles';

type TaskObject = {
  id: number;
  title: string;
  canEdit: boolean;
  rows: TaskRow[];
}

type TaskRow = {
  id: number;
  title: string;
  canEdit: boolean;
}

const ChecklistModal = ({ open, setOpen }) => {
  const theme = useTheme();
  const [open2, setOpen2] = useState(true);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [task, setTask] = useState<TaskObject[]>([
    {
      id: 0,
      title: '',
      canEdit: true,
      rows: [{
        id: 0,
        title: '',
        canEdit: true,
      }]
    }
  ]);

  // Functions to Edit task and subtasks
  const EditTask = () => {
    setTask((oldTasks) => {
      oldTasks[0].canEdit = true;
      return [...oldTasks];
    });
  };

  const EditSubTask = () => {
    setTask((oldSubTasks) => {
      oldSubTasks[0].rows[0].canEdit = true;
      return [...oldSubTasks];
    });
  };

  // Funtions to save the taskname and subtasksname into the array
  const SaveTask = () => {
    setTask((oldTasks) => {
      oldTasks[0].canEdit = false;
      oldTasks[0].title = document.getElementById('task-field').value;
      return [...oldTasks];
    });
  };

  const SaveSubTask = () => {
    setTask((oldSubTasks) => {
      oldSubTasks[0].rows[0].canEdit = false;
      oldSubTasks[0].rows[0].title = document.getElementById('subtask-field').value;
      return [...oldSubTasks];
    });
  };

  // Functions to add new Tasks and SubTasks

  const adddNewTask = () => {};
  const addNewSubTask = () => {
    const newSubTask = {
      id: 0,
      title: '',
      canEdit: true,
    };
    setTask((oldSubTasks) => {
      oldSubTasks[0].rows.push(newSubTask);
      return [...oldSubTasks];
    });
  };

  return (
    <ModalComponent open={open} setOpen={setOpen} title="Checklist">
      <>
        <InputField
          label="Título"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <DescriptionInputField
          label="Descrição"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna."
        />
        <ContentBox>
          {task.map((index) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index.id}>
              <TaskWrapper>
                <MenuIcon />
                {index.canEdit ? (
                  <>
                    <TaskField label="Título" placeholder='Lorem ipsum in dolor win' id='task-field' />
                    <SaveButton style={{ height: '24px' }} onClick={SaveTask}>Salvar</SaveButton>
                  </>)
                  : (
                    <>
                      <TaskTypography>{index.title}</TaskTypography>
                      <SaveButton style={{ height: '24px' }} onClick={EditTask}>Editar</SaveButton>
                    </>
                  )}
              </TaskWrapper>
              <Box sx={{ width: '92%', alignSelf: 'flex-end' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '0.6rem',
                    borderBottom: '1px solid #424242',
                  }}
                >
                  {open2 ? (
                    <IconButton
                      sx={{ color: 'gray', width: '5px', height: '9px' }}
                      onClick={handleClose2}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ color: 'gray', width: '5px', height: '9px' }}
                      onClick={handleOpen2}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: 'small' }} />
                    </IconButton>
                  )}
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      marginLeft: '0.7rem',
                    }}
                  >
                    Subtarefas
                  </Typography>
                </Box>
                {open2 ? (
                  <Box>
                    {index.rows.map((subtask) => (
                      <SubTask key={subtask.id}>
                        {subtask.canEdit ? (<><SubTaskField label="Descrição" id='subtask-field'/><SaveButton style={{ height: '24px' }} onClick={SaveSubTask}>Salvar</SaveButton><DeleteButton style={{ height: '24px' }}>
                          Excluir
                        </DeleteButton></>)
                          : (<><SubTaskTypography>{subtask.title}</SubTaskTypography><SaveButton style={{ height: '24px' }} onClick={EditSubTask}>Editar</SaveButton></>)}
                      </SubTask>
                    ))}
                  </Box>) : ''}
              </Box>
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
                  sx={{
                    borderColor: `${theme.palette.caption.main}`,
                    height: '0.6rem',
                    marginTop: '1.7rem',
                  }}
                />
                <AddSTButton onClick={addNewSubTask}>+ Adicionar Subtarefa</AddSTButton>
              </Box>
            </Box>
          ))}
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default ChecklistModal;
