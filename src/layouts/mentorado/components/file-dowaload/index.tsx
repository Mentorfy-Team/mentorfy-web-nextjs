import { useState } from 'react';
import Box from '@mui/material/Box';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DownloadText, DownloaddButton, FileWrapper } from './styles';

const FilesDownloadModal = () => {
    const [open, setOpen] = useState(true);
    return (
        <ModalComponent open={open} setOpen={setOpen} title='Modelo de Proposta' isMentorado>
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
