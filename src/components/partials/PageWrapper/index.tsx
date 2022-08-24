import { FC } from 'react';
import { Container, Wrapper } from './styles';

type props = {
  children: React.ReactElement;
  darkMode?: boolean;
};

const PageWrapper: FC<props> = ({ children, darkMode = true }) => {
  return (
    <Container>
      <Wrapper className={darkMode ? 'dark-mode' : ''}>{children}</Wrapper>
    </Container>
  );
};

export default PageWrapper;
