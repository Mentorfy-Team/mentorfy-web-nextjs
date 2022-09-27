import { Box } from '@mui/material';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { PasteCodeField } from './styles';

const EmbedModal = () => {
    return (
        <ModalComponent title='Embed'>
            <>
                <InputField label='Título'></InputField>
                <DescriptionInputField label='Campo de Texto Aberto' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                    <PasteCodeField
                        label='Campo de Texto Aberto'
                        multiline
                        maxRows={4}
                        color="secondary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {<Box>
                            <Image alt='' width={30} height={30} src='/svgs/upload.svg'></Image>

                        </Box>}
                    </PasteCodeField>
            </>
        </ModalComponent>
    );
};

export default EmbedModal;
