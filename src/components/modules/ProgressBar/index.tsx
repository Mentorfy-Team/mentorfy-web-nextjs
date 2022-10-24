import { BundleWrapper, CircleProgressBar, CircleWrapper, ClassesNumber, Dot, Line, StepsWrapper, TextWrapper, Title, Wrapper } from './styles';

const mock = {
    title: 'Primeiros Passos',
    classesNumber: '1 de 9 aulas',
    steps: [
        {
            title: 'Aula 1',
            description: 'Introdução',
            done: true,
        },
        {
            title: 'Aula 2',
            description: 'Introdução',
            done: false,
        },
        {
            title: 'Aula 3',
            description: 'Introdução',
            done: false,
        },
    ],
};

const ProgressBar = ({data=mock}) => {
    return (
        <Wrapper>
            <BundleWrapper>
                <CircleWrapper>
                    <CircleProgressBar value={40} variant="determinate" size={25} thickness={5} />
                    <Line />
                </CircleWrapper>
                <TextWrapper>
                    <Title>{mock.title}</Title>
                    <ClassesNumber>{`${1} de ${1} aula${'s'}`}</ClassesNumber>
                </TextWrapper>
            </BundleWrapper>

            <StepsWrapper>
                <CircleWrapper>
                    <Line />
                    <Dot />
                    <Line />
                </CircleWrapper>

                <TextWrapper>
                    <ClassesNumber>1 - Estruturando Mindset</ClassesNumber>
                </TextWrapper>
            </StepsWrapper>
        </Wrapper>
    );
};

export default ProgressBar;
