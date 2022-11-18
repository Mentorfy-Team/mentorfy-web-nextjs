import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  AnswersWrapper,
  AvatarWrapper,
  ClientName,
  FinishedDate,
  QuestionsText,
  TaskTitle,
  TitleWrapper,
  WheelWrapper,
} from './styles';
import Box from '@mui/material/Box';
import Image from 'next/image';
import TextRating from '~/components/atoms/Rating';
import WheelOfLifeTemplate from '~/layouts/mentorado/components/wheel-of-Life/template/WheelOfLifeTemplate';

export type ModalProps = {
  open: boolean;
  completedClient?: ProductTypes.Client;
  selectedTask?: any[];
  finishedDate?: string;
  clientInputs?: any[];
  setOpen?: (value: any) => any;
};
const CJwhellOfLife = ({
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
      title={ModalTitle}
      open={open}
      setOpen={setOpen}
      withX={false}
      onClose={() => setOpen(false)}
    >
      <ModalDialogContent>
        <AnswersWrapper>
          <TaskTitle sx={{ left: '30%' }}>{selectedTask.title}</TaskTitle>
          {selectedTask.data?.map((question, index) =>
            clientInputs.find((input) => question.id === input.id) ? (
              <Box
                key={question.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <QuestionsText>{question.title}</QuestionsText>
                <TextRating readOnly value={clientInputs[index].rating} />
              </Box>
            ) : null,
          )}
          <WheelWrapper>
            <WheelOfLifeTemplate
              taskData={selectedTask.data}
              input={clientInputs}
            />
          </WheelWrapper>
        </AnswersWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CJwhellOfLife;
