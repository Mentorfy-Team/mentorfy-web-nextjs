import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ContentBox } from './styles';

const WheelOfLife = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ModalComponent title='Roda da Vida'>
            <>
                <InputField label='Título' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <DescriptionInputField label='Descrição' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <ContentBox>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {open ? <IconButton sx={{ color: 'gray', width: '40px', height: '40px' }} onClick={handleClose}>
                                 <ExpandMoreIcon />
                                </IconButton>
                              :
                                <IconButton sx={{ color: 'gray', width: '40px', height: '40px' }}  onClick={handleOpen}>
                                    <ArrowForwardIosIcon sx={{fontSize: 'medium'}}/>
                                </IconButton>}
                        <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>Áreas da Roda da Vida</Typography>
                    </Box>
                    <Divider sx={{borderColor: '#6e6e6e55', marginBottom: '0.5rem'}}/>
                </ContentBox>
            </>
        </ModalComponent>
    );
};

export default WheelOfLife;
