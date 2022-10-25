import { DnDObject } from '../DragNDrop';
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

const ProgressBar = ({data=[]}:{data:DnDObject[]}) => {
    return (
        <Wrapper>
            {data.map((step, index) => (<div>
                <BundleWrapper>
                <CircleWrapper>
                    <CircleProgressBar value={40} variant="determinate" size={25} thickness={5} />
                    { step.rows.length > 0 && <Line />}
                </CircleWrapper>
                <TextWrapper>
                    <Title>{mock.title}</Title>
                    <ClassesNumber>{`${1} de ${1} aula${'s'}`}</ClassesNumber>
                </TextWrapper>
            </BundleWrapper>
                {step.rows.map((task, index) => (
                    <StepsWrapper>
                    <CircleWrapper>
                        <Line />
                        <Dot />
                    </CircleWrapper>
    
                    <TextWrapper>
                        <ClassesNumber sx={{
                            paddingTop: '0.8rem',
                        }}>{`${index+1} - ${task.title}`}</ClassesNumber>
                    </TextWrapper>
                </StepsWrapper>
                ))}
            </div>))}
        </Wrapper>
    );
};

export default ProgressBar;
