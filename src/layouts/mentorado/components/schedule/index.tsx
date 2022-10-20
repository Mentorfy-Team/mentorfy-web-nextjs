import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';

const Schedule = () => {
    const [open, setOpen] = useState(true);

    const HeadText = (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Image alt='perguntas' src='/svgs/schedule-icon.svg' height={20} width={22}/>
            <>Título do Formulário</>
        </Box>
    );
    return (
        <ModalComponent open={open} setOpen={setOpen}  title={HeadText}isMentorado>
            <ModalDialogContent isMentorado>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default Schedule;
