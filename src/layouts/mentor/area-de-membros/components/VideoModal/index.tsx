import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import AddImage from '../AddImage';

const VideoModal = () => {
    return (
        <ModalComponent title='Upload de Vídeo'>
            <>
                <InputField label='Título' placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'></InputField>
                <InputField label='Descrição' placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna.'></InputField>
                <AddImage />
                <DescriptionInputField label='Descrição' placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna.' ></DescriptionInputField>
                <InputField required label='Link*' placeholder='https://youtube.com.br/qHw91z'></InputField>
            </>
        </ModalComponent>
    );
};

export default VideoModal;
