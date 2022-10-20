import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DownloadText, DownloaddButton, FileWrapper } from './styles';

const FilesDownloadModal = () => {
    const [open, setOpen] = useState(true);

    const HeadText = (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Image alt='perguntas' src='/svgs/files-download-icon.svg' height={20} width={22}/>
            <>Título do Formulário</>
        </Box>
    );
    return (
        <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
            <ModalDialogContent isMentorado sx={{textAlign: 'center'}}>
                <FileWrapper>
                    <Box sx={{width: '545px', height: '420px', backgroundColor: 'white'}}></Box>
                </FileWrapper>

                <DownloadText>Faça o download abaixo</DownloadText>
                <DownloaddButton>DOWNLOAD</DownloaddButton>
            </ModalDialogContent>
        </ModalComponent>
    );
};

export default FilesDownloadModal;
