import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import { AddSTButton, SaveButton, TaskField, TaskWrapper } from './styles';

const ChecklistModal = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    return (
        <ModalComponent title='Checklist'>
            <>
                <InputField label='Título' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <DescriptionInputField label='Descrição' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <ContentBox>
                    <TaskWrapper>
                        <MenuIcon />
                        <TaskField label='Título' />
                        <SaveButton style={{ height: '24px' }}>Salvar</SaveButton>
                    </TaskWrapper>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #424242', width: '92%', float: 'right' }}>
                            {open ? <IconButton sx={{ color: 'gray', width: '5px', height: '9px' }} onClick={handleClose}>
                                <ExpandMoreIcon />
                            </IconButton>
                                :
                                <IconButton sx={{ color: 'gray', width: '5px', height: '9px' }} onClick={handleOpen}>
                                    <ArrowForwardIosIcon sx={{ fontSize: 'small' }} />
                                </IconButton>}
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: '400', marginLeft: '0.7rem' }}>Subtarefas</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Divider
                                orientation="vertical"
                                sx={{
                                    borderColor: `${theme.palette.caption.main}`,
                                    height: '0.6rem',
                                    marginTop: '1.5rem'
                                }}
                            />
                            <AddSTButton
                            >
                                + Adicionar Pergunta
                            </AddSTButton>
                        </Box>
                    </Box>

                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {open2 ? <IconButton sx={{ color: 'gray', width: '40px', height: '40px' }} onClick={handleClose2}>
                                 <ExpandMoreIcon />
                                </IconButton>
                              :
                                <IconButton sx={{ color: 'gray', width: '40px', height: '40px' }}  onClick={handleOpen2}>
                                    <ArrowForwardIosIcon sx={{fontSize: 'medium'}}/>
                                </IconButton>}
                        <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>Formatos de Entrega</Typography>
                    </Box>
                    <Divider sx={{borderColor: '#6e6e6e55', marginBottom: '0.5rem'}}/> */}
                </ContentBox>
            </>
        </ModalComponent>
    );
};

export default ChecklistModal;
