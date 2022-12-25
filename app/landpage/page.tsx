'use client';

import React from 'react';

import { ActionButton, ClientSupport, Container, FeatureText, FeatureWrapper, Features, FeaturesContainer, IconWrapper, Integrations, Introduction, MainText, OrangeGradient, SecodaryText, SecondSection, SecondSectionText, VideoSection, Wrapper } from './styles';
import { GlobalStyles, ThemeProvider } from '~/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { MainFeatures, MentorFeatures, SalesFeatures } from './helpers/FeaturesList';
export default function Page() {

  return (
    <ThemeProvider>
      <GlobalStyles />
      <CssBaseline />
      <Wrapper>
        <Introduction>
          <Box sx={{
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
            <Image
              alt='mentor-fy-logo'
              src='/images/logo-montanha.png'
              width={220}
              height={80}
            />
            <SecodaryText>
              Gerencie 1000 mentorados como se fossem 10
            </SecodaryText>
            <MainText>
              A primeira Área de membros 100% focada em processos de mentorias com experiência Premium
            </MainText>
            <SecodaryText>
              Todas as ferramentas que você precisa para entregar sua mentoria com escala,
              sem perder o controle ou abrir mão da qualidade de atendimento.
              <strong>Become a Legend</strong>
            </SecodaryText>

            <ActionButton>
              Quero conhecer a ferramenta
            </ActionButton>
          </Box>

          <Box sx={{ maxWidth: '900px' }}>
            <Image
              alt='mentorfy-representation'
              src='/images/lp-main-image.png'
              width={850}
              height={500}
              quality={100}
              style={{
                position: 'absolute',
                zIndex: '4',
                marginTop: '5rem',
              }}
            />
            <OrangeGradient id='orange' />
            <Image
              alt='background-mountain'
              src='/images/lp-mountain.png'
              width={1000}
              height={404}
              style={{
                position: 'absolute',
                zIndex: '3',
                top: '45%',
                right: '-9%'
              }}
            />
          </Box>
        </Introduction>
        <SecondSection>
          <Box>
            <Image
              alt='become-legend'
              src='/images/lp-become-legend.png'
              width={700}
              height={200}
              style={{
                position: 'absolute',
                zIndex: '1',
                opacity: '0.8',
                top: '-20%',
                left: '0',
              }}
            />
            <Image
              alt='mentors-group'
              src='/images/mentors-group.png'
              width={500}
              height={500}
            />
          </Box>
          <Box sx={{ alignSelf: 'end' }}>
            <MainText sx={{ maxWidth: '450px' }}>
              Sua jornada não precisa ser solitária!
            </MainText>
            <SecondSectionText>
              A <strong>Mentorfy</strong> foi criada de um mentor para mentores, nosso método de gestão de produtos de orientação já tirou mais de 1200 projetos do papel.
              <span>Inovamos a forma de se entregar à mentoria, com escala e previsibilidade para que você mentor preocupe-se apenas em gerar soluções e boas ideias.</span>
              <span>Estamos prontos para lhe apoiar desde os seus primeiros passos com sua experiência Mentorfy, até estratégias mais avançadas para ajudar você a alavancar e escalar ainda mais as suas vendas!</span>
            </SecondSectionText>
            <ActionButton sx={{ width: '30%', marginBottom: '1.5rem' }}>Ver demonstração</ActionButton>
          </Box>
        </SecondSection>
        <ClientSupport>
          <Container>
            <Image
              alt='become-legend'
              src='/images/cellphone.png'
              width={400}
              height={430}
              style={{
                zIndex: '2',
                marginTop: '-15%',
                left: '4%',
              }}
            />
            <Box sx={{ width: '50%', marginLeft: 'auto' }}>
              <MainText mb={4}>
                Conte com o melhor suporte
                que você jamais imaginou existir.
              </MainText>
              <SecodaryText>
                Crie sua conta e receba ainda hoje o acesso ao nosso WhatsApp com a nossa equipe!
              </SecodaryText>
            </Box>
          </Container>
        </ClientSupport>
        <Features>
          <OrangeGradient id='orange' sx={{
            zIndex: '0',
            left: '-40%',
            top: '30%'
          }} />
          <Image
            alt='become-legend'
            src='/images/lp-become-legend.png'
            width={700}
            height={200}
            style={{
              position: 'absolute',
              zIndex: '1',
              opacity: '0.8',
              top: '79%',
              left: '0',
            }}
          />
          <Box sx={{ width: '75%', margin: '0 auto', textAlign: 'center' }}>
            <MainText>
              Funcionalidades que entregam a melhor experiência
              e aumentam o engajamento dos seus mentorados.
            </MainText>
          </Box>
          <FeaturesContainer>
            {MainFeatures.map((feature) => (
              <FeatureWrapper key={feature.label}>
                <IconWrapper>
                  <Image
                    alt='feature-icon'
                    src={feature.icon}
                    width={22}
                    height={24}
                  />
                </IconWrapper>
                <FeatureText>
                  {feature.label}
                </FeatureText>
              </FeatureWrapper>
            ))}
          </FeaturesContainer>
        </Features>
        <Features sx={{ marginTop: '6rem' }}>
          <OrangeGradient id='orange' sx={{
            zIndex: '0',
            right: '-40%'
          }} />
          <Box sx={{ textAlign: 'center' }}>
            <MainText>
              Funcionalidades Mentor
            </MainText>
          </Box>
          <FeaturesContainer>
            {MentorFeatures.map((feature) => (
              <FeatureWrapper key={feature.label} sx={{ width: '300px' }}>
                <IconWrapper>
                  <Image
                    alt='feature-icon'
                    src={feature.icon}
                    width={22}
                    height={24}
                  />
                </IconWrapper>
                <FeatureText>
                  {feature.label}
                </FeatureText>
              </FeatureWrapper>
            ))}
          </FeaturesContainer>
        </Features>
        <Features sx={{ marginTop: '6rem' }}>
          <Box sx={{ width: '75%', margin: '0 auto' }}>
            <MainText>
              Funcionalidades que entregam a melhor experiência
              e aumentam o engajamento dos seus mentorados.
            </MainText>
          </Box>
          <FeaturesContainer>
            {SalesFeatures.map((feature) => (
              <FeatureWrapper key={feature.label} sx={{ width: '300px' }}>
                <IconWrapper>
                  <Image
                    alt='feature-icon'
                    src={feature.icon}
                    width={22}
                    height={24}
                  />
                </IconWrapper>
                <FeatureText>
                  {feature.label}
                </FeatureText>
              </FeatureWrapper>
            ))}
          </FeaturesContainer>

          <ActionButton sx={{ width: '15%', margin: '0 auto' }}>Ver detalhes</ActionButton>
          <Image
            alt='background-mountain'
            src='/images/lp-mountain.png'
            width={1000}
            height={404}
            style={{
              position: 'absolute',
              zIndex: '0',
              top: '45%',
              right: '0%'
            }}
          />
        </Features>
        <Integrations>
          <Box>
            <Image
              alt='integrações'
              src='/images/integrations.png'
              width={500}
              height={500}
            />
          </Box>
          <Box sx={{ alignSelf: 'end' }}>
            <MainText sx={{ maxWidth: '80%' }}>
              Integração Simples com Platafomras de Pagamentos.
            </MainText>
            <SecondSectionText sx={{ margin: '2rem 0' }}>
              Hotmart, Eduzz, D. Manager Guru, Abmex, Appmax, Asaas,
              Blitz Pay, Braip, Chegow, Doppus, Kiwify, Monetizze, Perfect Pay, Proluno, Stripe, Ticto, Yampi
              <strong>  Alô Não encontrou o seu Gateway? Nós integramos para você!</strong>
            </SecondSectionText>
            <ActionButton sx={{ width: '30%', marginBottom: '4rem' }}>Ver demonstração</ActionButton>
          </Box>
        </Integrations>
        <VideoSection>
          <OrangeGradient id='orange'
            sx={{
              left: '12%',
              top: '0',
              zIndex: '0',
            }}
          />
          <Image
            alt='background-mountain'
            src='/images/lp-mountain.png'
            width={800}
            height={300}
            style={{
              position: 'absolute',
              zIndex: '2',
              top: '65%',
              left: '-30%'
            }}
          />
          <MainText color='accent.main'>
            Não fique na curiosidade.
          </MainText>
          <SecondSectionText>
            Inspire-se nos exemplos de áreas de mentoria pré configuradas que deixamos criados para você.
          </SecondSectionText>
          <Box sx={{ background: 'gray', aspectRatio: '16/9', width: '60%', zIndex: '3' }}></Box>
          <ActionButton sx={{ margin: '3rem 0', width: '20%', zIndex: '3' }}> Ver demonstração</ActionButton>
        </VideoSection>

      </Wrapper >
    </ThemeProvider >
  );
}
