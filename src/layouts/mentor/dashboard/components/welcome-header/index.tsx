import React from 'react';
import {
  BannerWrapper,
  DescriptionText,
  MentorName,
  NameWrapper,
  TextsWrapper,
  WelcomeText,
} from '../../styles';
import { MountainName } from '../finance/styles';
import Image from 'next/image';

// import { Container } from './styles';

const WelcomeHeader = ({ name, disabled }) => {
  return (
    !disabled && (
      <BannerWrapper id="banner">
        <TextsWrapper>
          <NameWrapper>
            <MountainName />
            <MentorName>Olá, {name}</MentorName>
          </NameWrapper>
          <WelcomeText>Seja bem-vindo(a) ao Mentorfy</WelcomeText>
          <DescriptionText>
            Mais que uma plataforma dedicada a mentores, somos um caminho.
            Acreditamos que o papel de um mentor é descobrir soluções e caminhos
            que ainda não existem na realidade humana, mas quando criados e
            mapeados, podem dar nomes às montanhas assim como foi com George
            EVEREST. Mentor, essa é a sua jornada, bem vindo ao caminho que vai
            te transformar em uma lenda!
          </DescriptionText>
        </TextsWrapper>
        <Image
          alt="banner"
          width={371}
          height={150}
          src="/images/frase.png"
          quality={100}
          style={{ margin: '3rem 0 0 auto' }}
        />
      </BannerWrapper>
    )
  );
};

export default WelcomeHeader;
