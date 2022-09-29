// import { useState } from 'react';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { AreasBox, ContentBox } from './styles';

const WheelOfLifeModal = () => {
    const theme = useTheme();

    // const [open, setOpen] = useState(true);

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const WheelAreas = [
        {
            id: 0,
            name: 'CONTRIBUIÇÃO SOCIAL'
        },
        {
            id: 0,
            name: 'DESENVOLVMENTO INTELECTUAL'
        },
        {
            id: 0,
            name: 'EQUILÍBRIO EMOCIONAL'
        },
        {
            id: 0,
            name: 'ESPIRITUALIDADE'
        },
        {
            id: 0,
            name: 'FAMÍLIA'
        },
        {
            id: 0,
            name: 'LAZER E HOBBIES'
        },
        {
            id: 0,
            name: 'PLENITUDE FINANCEIRA'
        },
        {
            id: 0,
            name: 'REALIZAÇÃO DE PROPÓSITO'
        },
        {
            id: 0,
            name: 'RELACIONAMENTO AMOROSO'
        },
        {
            id: 0,
            name: 'SAÚDE E CONDIÇÃO FÍSICA'
        },
        {
            id: 0,
            name: 'SAÚDE FINANCEIRA'
        },
        {
            id: 0,
            name: 'VIDA SOCIAL E AMIZADE'
        },
    ];

    function BpCheckbox(props: CheckboxProps) {
        return (
            <Checkbox
                sx={{
                    padding: '0',
                    color: `${theme.palette.caption.dark}`,
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                    '&.Mui-checked': {
                        color: 'green',
                    },
                }}
                disableRipple
                color="default"
                {...props}
            />
        );
    }

    return (
        <ModalComponent title='Roda da Vida'>
            <>
                <InputField label='Título' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <DescriptionInputField label='Descrição' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <ContentBox>
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                             <IconButton sx={{ color: 'gray', width: '40px', height: '40px' }}>
                                <ExpandMoreIcon />
                            </IconButton>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>Áreas da Roda da Vida</Typography>
                        </Box>
                        <Divider sx={{ borderColor: '#6e6e6e55', marginBottom: '0.5rem', width: '90%', float: 'right' }} />
                        {WheelAreas.map((index) => (
                            <AreasBox key={index.id}>
                                <BpCheckbox defaultChecked/>
                                <Typography sx={{ fontSize: '0.7rem', fontWeight: '300', opacity: '0.8' }}>{index.name}</Typography>
                            </AreasBox>
                        ))}
                    </>
                </ContentBox>
            </>
        </ModalComponent>
    );
};

export default WheelOfLifeModal;
