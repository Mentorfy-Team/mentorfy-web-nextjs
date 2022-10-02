import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import { AddQButton, Question, QuestionField } from './styles';

type QuestionsObject = {
  id: number;
  title: string;
};

const QuestionFormModal = ({ open, setOpen }) => {
  const theme = useTheme();
  const [questions, setQuestions] = useState<QuestionsObject[]>([
    {
      id: 0,
      title: '1ª Pergunta',
    },
  ]);

  const addNewQuestion = () => {
    const newQuestion = {
      id: Math.random(),
      title: questions.length + 1 + 'ª Pergunta',
    };
    setQuestions([...questions, newQuestion]);
  };
  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Formulário de Perguntas"
    >
      <>
        <InputField
          label="Título"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <DescriptionInputField
          label="Campo de Texto Aberto"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna."
        />
        <ContentBox>
          {questions.map((index) => (
            <Question key={index.id}>
              <MenuIcon />
              <QuestionField label={index.title} />
            </Question>
          ))}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Divider
              orientation="vertical"
              sx={{
                borderColor: `${theme.palette.caption.main}`,
                height: '0.6rem',
              }}
            />
            <AddQButton onClick={addNewQuestion}>
              + Adicionar Pergunta
            </AddQButton>
          </Box>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default QuestionFormModal;
