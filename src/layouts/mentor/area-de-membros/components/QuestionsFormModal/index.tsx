import MenuIcon from '@mui/icons-material/Menu';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { Question, QuestionInput, QuestionsBox } from './styles';

const QuestionFormModal = () => {
    return (
        <ModalComponent title='Formulário de Perguntas'>
            <>
                <InputField label='Título' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <DescriptionInputField label='Campo de Texto Aberto' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna." />
                <QuestionsBox>
                    <Question>
                        <MenuIcon sx={{color: 'gray'}}/>
                        <QuestionInput />
                    </Question>
                    <Question>
                        <MenuIcon sx={{color: 'gray'}}/>
                        <QuestionInput />
                    </Question>
                </QuestionsBox>
            </>
        </ModalComponent>
    );
};

export default QuestionFormModal;
