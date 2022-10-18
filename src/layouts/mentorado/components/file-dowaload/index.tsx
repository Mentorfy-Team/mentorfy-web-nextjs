import Box from '@mui/material/Box';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DownloadText, DownloaddButton, FileWrapper } from './styles';

const FilesDownloadModal = ({open, setOpen}) => {
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
