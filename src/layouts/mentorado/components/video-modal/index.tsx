import { useState } from 'react';
import Box  from '@mui/material/Box';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { CompleteButton, Description } from './styles';

const VideoViewModal = () => {
    const [open, setOpen] = useState(true);
    return (
        <ModalComponent title='Título do Vídeo' setOpen={setOpen} open={open} isMentorado>
            <ModalDialogContent isMentorado>
                <Description>
                    Descrição do Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Description>

                <Box sx={{width: '100%', height: '480px', backgroundColor: 'black'}}></Box>

                <CompleteButton variant='contained'>Concluído</CompleteButton>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default VideoViewModal;
