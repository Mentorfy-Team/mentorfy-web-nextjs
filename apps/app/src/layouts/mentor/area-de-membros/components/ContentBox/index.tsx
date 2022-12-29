import { ContentWrapper } from './styles';

type props = {
    children?: JSX.Element
}
const ContentBox = ({children}) => {
    return (
        <ContentWrapper>{children}</ContentWrapper>
    );
};

export default ContentBox;
