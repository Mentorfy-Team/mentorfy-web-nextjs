import { BundleWrapper, CircleProgressBar, CircleWrapper, ClassesNumber, Dot, Line, StepsWrapper, TextWrapper, Title, Wrapper } from './styles';

const ProgressBar = () => {
    return (
        <Wrapper>
            <BundleWrapper>
                <CircleWrapper>
                    <CircleProgressBar value={40} variant="determinate" size={25} thickness={5} />
                    <Line />
                </CircleWrapper>
                <TextWrapper>
                    <Title>Primeiros Passos</Title>
                    <ClassesNumber>1 de 9 aulas</ClassesNumber>
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
