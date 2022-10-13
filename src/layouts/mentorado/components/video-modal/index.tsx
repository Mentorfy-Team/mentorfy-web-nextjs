import { Typography } from '@mui/material';
import ModalComponent from '~/components/modules/Modal';

const VideoViewModal = ({setOpen}) => {
    return (
        <ModalComponent title='Vídeo de Apresentação' setOpen={setOpen} open>
            <Typography>Olá mundo</Typography>
        </ModalComponent>
    );
};

export default VideoViewModal;
