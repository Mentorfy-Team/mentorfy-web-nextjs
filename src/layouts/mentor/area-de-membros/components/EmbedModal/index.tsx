import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { P, PasteCodeField, PlaceHolderBox, UploadTypography } from './styles';

const EmbedModal = () => {
    const [display, setDisplay] = useState('flex');

    const PlaceHolder = () => {
        setDisplay('none');
    };

    const PlaceHolderonBlur = () => {
        const value = document.getElementById('placeholder').value;
        if(value) {
            setDisplay('none');
        } else {
            setDisplay('flex');
        }
    };

    return (
        <ModalComponent title='Embed'>
            <>
                <InputField label='Título' placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'></InputField>
                <DescriptionInputField label='Campo de Texto Aberto' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <Box>
                    <PlaceHolderBox sx={{ display: `${display}` }} >
                        <Image alt='' width={30} height={30} src='/svgs/embed.svg'></Image>
                        <UploadTypography>Cole seu código aqui</UploadTypography>
                        <P>Tamanho máximo de 500mb por arquivo</P>
                    </PlaceHolderBox>
                    <PasteCodeField
                        id='placeholder'
                        onFocus={PlaceHolder}
                        onBlur={PlaceHolderonBlur}
                        className='text-field'
                        label='Campo de Texto Aberto'
                        multiline
                        maxRows={10}
                        color="secondary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                    </PasteCodeField>
                </Box>
            </>
        </ModalComponent>
    );
};

export default EmbedModal;
