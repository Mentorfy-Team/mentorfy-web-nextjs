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
  id: string;
  title: string;
  data?: string;
};

const QuestionFormModal = ({
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData, data: questionsData },
}) => {
  const theme = useTheme();
  const [questions, setQuestions] = useState<QuestionsObject[]>(
    questionsData || [
      {
        id: '0',
        title: '1ª Pergunta',
      },
    ],
  );
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const addNewQuestion = () => {
    const newQuestion = {
      id: Math.random() + '',
      title: questions.length + 1 + 'ª Pergunta',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSave = () => {
    onChange({
      title,
      description,
      questions,
    });
    setOpen(false);
  };

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Formulário de Perguntas"
      onSave={() => handleSave()}
    >
      <>
        <InputField
          label="Título"
          placeholder="Digite o título da etapa"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <DescriptionInputField
          label="Descrição"
          placeholder="Dê uma descrição/instrução para essa etapa"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <ContentBox>
          {questions.map((question) => (
            <Question key={question.id}>
              <MenuIcon />
              <QuestionField
                label={question.title}
                placeholder="Escreva sua pergunta aqui..."
                value={question.data}
                onChange={(e) =>
                  setQuestions((oldQuestions) => {
                    const newQuestions = [...oldQuestions];
                    newQuestions.find((q) => q.id === question.id).data =
                      e.target.value;
                    return newQuestions;
                  })
                }
              />
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
