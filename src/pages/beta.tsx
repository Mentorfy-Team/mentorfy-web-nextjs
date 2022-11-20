import Lottie from 'react-lottie';
import * as animationData from '../../public/working.json';
import { Container } from './_app.styles';
import NextImage from 'next/image';

const pages: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
      <Lottie options={defaultOptions} height={400} width={400} />
    </Container>
  );
};

export default pages;
