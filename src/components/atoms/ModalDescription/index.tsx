import { FC } from 'react';
import { DescriptionText } from './styles';

type props = {
    children: string | JSX.Element;
}

const Description: FC<props> = ({children}) => {
    return (
        <DescriptionText>{children}</DescriptionText>
    );
};

export default Description;
