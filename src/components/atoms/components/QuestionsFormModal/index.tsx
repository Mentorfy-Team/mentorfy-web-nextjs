import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { AnswersWrapper, AvatarWrapper, ClientName, FinishedDate, QuestionsText, ResponseText, TaskTitle, TitleWrapper } from './styles';
import Box from '@mui/material/Box';
import Image from 'next/image';

export type ModalProps = {
    open: boolean,
    completedClient?: any[],
    selectedTask?: any[],
    finishedDate?: string,
    clientInputs?: any[],
    setOpen?: (value: any) => any;
}
    ;
const CJQuestionsForm = ({ open, setOpen, completedClient, selectedTask, finishedDate, clientInputs }) => {
    const ModalTitle = (
        <TitleWrapper>
            {completedClient.avatar ? (
                <AvatarWrapper>
                    <Image
                        alt='avatar'
                        src={completedClient[0].avatar}
                        width={40}
                        height={40}
                    />
                </AvatarWrapper>
            ) : null}
            <ClientName>{completedClient[0] && completedClient[0].name}</ClientName>
            <FinishedDate>
                {
                    new Date(finishedDate).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                }</FinishedDate>
        </TitleWrapper>
    );

    return (
        <ModalComponent title={ModalTitle} open={open} setOpen={setOpen}>
            <ModalDialogContent>
                <TaskTitle>{selectedTask.title}</TaskTitle>
                <AnswersWrapper>
                    <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {
                            selectedTask.data?.map((question) => (

                                <QuestionsText key={question.id}>{question.data}</QuestionsText>
                            ))
                        }
                    </Box>
                    <Box sx={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {
                            clientInputs.map((response) => (

                                <ResponseText key={response.id}>{'R: ' + response.value}</ResponseText>
                            ))
                        }
                    </Box>
                </AnswersWrapper>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default CJQuestionsForm;
