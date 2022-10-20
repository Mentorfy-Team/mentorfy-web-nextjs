import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { CloseButton, Description } from './styles';

const OpenText = () => {
    const [open, setOpen] = useState(true);

    const HeadText = (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Image alt='perguntas' src='/svgs/open-text-icon.svg' height={20} width={22}/>
            <>Título do Formulário</>
        </Box>
    );
    return (
        <ModalComponent open={open} setOpen={setOpen}  title={HeadText}isMentorado>
            <ModalDialogContent isMentorado>
                <Description></Description>

                <Box>
                    {/* // TODO: show txt */}
                </Box>
                <CloseButton>Fechar</CloseButton>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default OpenText;
