import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  AnswersWrapper,
  AvatarWrapper,
  ClientName,
  FinishedDate,
  NoInfoText,
  ResponseText,
  StudentComments,
  TaskTitle,
  TitleWrapper,
} from './styles';
import Image from 'next/image';

export type ModalProps = {
  open: boolean;
  completedClient?: ProductTypes.Client;
  selectedTask?: any[];
  finishedDate?: string;
  clientInputs?: any[];
  setOpen?: (value: any) => any;
};
const CJVideoModal = ({
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
          <StudentComments>Comentários do Aluno :</StudentComments>
          {clientInputs ? (
            clientInputs?.map((response) => (
              <ResponseText key={response.id}>{response.comment}</ResponseText>
            ))
          ) : (
            <NoInfoText>Não há comentários nesta etapa!</NoInfoText>
          )}
        </AnswersWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CJVideoModal;
