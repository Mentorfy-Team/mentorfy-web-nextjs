import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { BoxHeader, Step, WrapperContent } from './styles';

type props = {
    children?: JSX.Element;
    image?:  string;
    title?: JSX.Element | string;
    stepType?: JSX.Element | string;
}
const EditMembersAreaSteps: FC<props> = ({children, image, title, stepType}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Step>
            <BoxHeader>
                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <MenuIcon sx={{ color: `${theme.palette.tertiary.main}`, cursor: 'pointer' }}/>
                    <Image
                        alt=""
                        src={image}
                        width={60}
                        height={60}
                    ></Image>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography
                            sx={{
                                color: `${theme.palette.text.primary}`,
                                fontSize: '1rem',
                                fontWeight: '700',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            sx={{
                                color: `${theme.palette.success.main}`,
                                fontSize: '1rem',
                            }}
                        >
                           {stepType}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    onClick={open ? handleClose : handleOpen}
                    sx={{ textTransform: 'none' }}
                >
                    Editar
                </Button>
            </BoxHeader>
            <WrapperContent sx={{ display: `${open ? 'flex' : 'none'}` }}>{children}</WrapperContent>
        </Step>
    );
};

export default EditMembersAreaSteps;
