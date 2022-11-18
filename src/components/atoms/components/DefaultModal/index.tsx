import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  AvatarWrapper,
  ClientName,
  FinishedDate,
  NoInfoText,
  TitleWrapper,
} from './styles';
import Image from 'next/image';

export type ModalProps = {
  open: boolean;
  completedClient?: any[];
  finishedDate?: string;
  setOpen?: (value: any) => any;
};
const CJQuestionsForm = ({ open, setOpen, completedClient, finishedDate }) => {
  const ModalTitle = (
    <TitleWrapper>
      <AvatarWrapper>
        {completedClient?.avatar ? (
          <Image
            alt="avatar"
            src={completedClient[0].avatar}
            width={40}
            height={40}
          />
        ) : null}
      </AvatarWrapper>
      <ClientName>
        {completedClient && completedClient[0] && completedClient[0].name}
      </ClientName>
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
        <NoInfoText>Não há mais detalhes sobre esta etapa!</NoInfoText>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CJQuestionsForm;
