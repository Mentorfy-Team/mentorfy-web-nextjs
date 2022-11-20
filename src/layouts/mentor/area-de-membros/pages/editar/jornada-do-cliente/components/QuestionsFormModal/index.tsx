import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  AnswersWrapper,
  AvatarWrapper,
  ClientName,
  FinishedDate,
  QuestionsText,
  ResponseText,
  TaskTitle,
  TitleWrapper,
} from './styles';
import Box from '@mui/material/Box';
import Image from 'next/image';

export type ModalProps = {
  open: boolean;
  completedClient?: ProductTypes.Client;
  selectedTask?: any[];
  finishedDate?: string;
  clientInputs?: any[];
  setOpen?: (value: any) => any;
};
const CJQuestionsForm = ({
  open,
  setOpen,
  completedClient,
  selectedTask,
  finishedDate,
  clientInputs,
}) => {
  const ModalTitle = (
    <TitleWrapper>
      <AvatarWrapper>
        {completedClient.avatar ? (
          <Image
            alt="avatar"
            src={completedClient.avatar}
            width={40}
            height={40}
          />
        ) : null}
      </AvatarWrapper>
      <ClientName>{completedClient && completedClient.name}</ClientName>
      <FinishedDate>
        {new Date(finishedDate).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </FinishedDate>
    </TitleWrapper>
  );

  return (
    <ModalComponent
      withX={false}
      title={ModalTitle}
      open={open}
      setOpen={setOpen}
      onClose={() => setOpen(false)}
    >
      <ModalDialogContent id="content">
        <TaskTitle>{selectedTask.title}</TaskTitle>
        <AnswersWrapper>
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
            {selectedTask.data?.map((question) => (
              <QuestionsText key={question.id}>{question.data}</QuestionsText>
            ))}
          </Box>
          <Box
            sx={{
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
            {clientInputs.map((response) => (
              <ResponseText key={response.id}>
                {'R: ' + response.value}
              </ResponseText>
            ))}
          </Box>
        </AnswersWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CJQuestionsForm;
