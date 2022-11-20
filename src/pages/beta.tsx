import { Container } from './_app.styles';
import NextImage from 'next/image';

const pages: React.FC = () => {
  return (
    <Container>
      <h5>SITE EM CONSTRUÇÃO</h5>
      <NextImage
        alt="Mentorfy"
        src="/images/tipografia.png"
        style={{
          objectFit: 'contain',
        }}
        width={200}
        height={70}
      />
    </Container>
  );
};

export default pages;
