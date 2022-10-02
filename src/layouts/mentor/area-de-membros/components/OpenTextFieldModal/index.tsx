import  Box  from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { Label, P, UploadInput, UploadTypography } from './styles';

const OpenTextFieldModal = () => {
    return (
        <ModalComponent title='Campo de Texto Aberto'>
            <>
                <InputField label='Título' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <DescriptionInputField label='Campo de Texto Aberto' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <Box>
                    <Label htmlFor="arquivo">
                        <Image alt='upload' width={58} height={39} src='/svgs/upload.svg' />
                        <UploadTypography>Solte os arquivos para fazer upload</UploadTypography>
                        <P>Tamanho máximo de 500mb por arquivo</P>
                    </Label>
                    <UploadInput type='file' name='arquivo' id='arquivo'></UploadInput>
                </Box>
            </>
        </ModalComponent>
    );
};

export default OpenTextFieldModal;
