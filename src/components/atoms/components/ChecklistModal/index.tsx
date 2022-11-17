import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { AnswersWrapper, AvatarWrapper, ClientName, FinishedDate, QuestionsText, TaskTitle, TaskWrapper, TitleWrapper } from './styles';
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
const CJChecklist = ({ open, setOpen, completedClient, selectedTask, finishedDate, clientInputs }) => {
    const ModalTitle = (
        <TitleWrapper>
            {completedClient[0].avatar ? (
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
                <AnswersWrapper>
                    {
                        selectedTask.data?.map((question) => (
                            <TaskWrapper key={question.id}>

                                <TaskTitle>{question.title +' :'}</TaskTitle>

                                {question.rows.map((subTask) => (
                                    clientInputs.find((input) => subTask.id === input.id && input.value === true) ?
                                        <Box key={subTask.id} sx={{ display: 'flex', gap: '0.5rem' }}>
                                            <Image
                                                alt="imagem"
                                                width={14}
                                                height={15}
                                                src='/svgs/done.svg'
                                            />
                                            <QuestionsText sx={{ color: 'green' }}>{subTask.title}</QuestionsText>
                                        </Box>
                                        :
                                        <Box key={subTask.id} sx={{ display: 'flex', gap: '0.5rem' }}>
                                            <Image
                                                alt="imagem"
                                                width={14}
                                                height={15}
                                                src='/svgs/done-gray.svg'
                                            />
                                            <QuestionsText sx={{ color: 'gray' }}>{subTask.title}</QuestionsText>
                                        </Box>
                                ))}

                            </TaskWrapper>
                        ))
                    }
                </AnswersWrapper>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default CJChecklist;
