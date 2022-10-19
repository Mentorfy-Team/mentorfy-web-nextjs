import { useState } from 'react';
import Box from '@mui/material/Box';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { BackButton, ButtonsWrapper, Description, ForwardButton, Question } from './styles';

const QuestionsForm = () => {
    const [open, setOpen] = useState(true);
    return (
        <ModalComponent open={open}  setOpen={setOpen}  title='Título do Formulário de Perguntas' isMentorado>
            <ModalDialogContent isMentorado sx={{ width: '680px' }}>
                <Description>
                    Descrição do Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Description>

                <Box sx={{textAlign: 'center', marginTop: '3rem'}}>
                    <Question>5 - Qual o nome do seu 3º pet adotado pela sua família?</Question>

                    <InputField />
                </Box>

                <ButtonsWrapper>
                    <BackButton variant='contained'>Anterior</BackButton>
                    <ForwardButton variant='contained'>Próximo</ForwardButton>
                </ButtonsWrapper>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default QuestionsForm;
