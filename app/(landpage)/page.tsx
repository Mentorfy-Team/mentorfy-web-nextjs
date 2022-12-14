'use client';

import React, { useState } from 'react';

import {
  ActionButton,
  AnswerWrapper,
  ClientSupport,
  Container,
  ContentHolder,
  FAQ,
  FAQText,
  FeatureText,
  FeatureWrapper,
  Features,
  FeaturesContainer,
  IconWrapper,
  Integrations,
  Introduction,
  MainText,
  OrangeGradient,
  Question,
  QuestionsHolder,
  QuestionsWrapper,
  SecodaryText,
  SecondSection,
  SecondSectionText,
  VideoSection,
  Wrapper,
} from './styles';
import { GlobalStyles, ThemeProvider } from '~/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import Box from '@mui/material/Box';
import {
  FAQList,
  MainFeatures,
  MentorFeatures,
  SalesFeatures,
} from './helpers/FeaturesList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [collapse, setCollapse] = useState(false);
  const [questionId, setQuestionId] = useState<string>();
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 1200px)');
  const handleCollapse = (question) => {
    setQuestionId(question);

    if (question === questionId) {
      setCollapse(!collapse);
    } else {
      setCollapse(true);
    }
  };

  return (
    <ThemeProvider>
      <GlobalStyles />
      <CssBaseline />

      <Wrapper>
        <Introduction>
          <ContentHolder>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                flex: 1,
                padding: '0 2rem 2rem 2rem',
              }}
            >
              <Image
                alt="mentor-fy-logo"
                src="/images/logo-montanha.png"
                width={isMobile ? 110 : 220}
                height={isMobile ? 40 : 80}
              />
              <SecodaryText>
                Gerencie 1000 mentorados como se fossem 10
              </SecodaryText>
              <MainText variant="h1">
                A primeira ??rea de membros 100% focada em processos de mentorias
                com experi??ncia Premium
              </MainText>
              <SecodaryText>
                Todas as ferramentas que voc?? precisa para entregar sua mentoria
                com escala, sem perder o controle ou abrir m??o da qualidade de
                atendimento.
                <strong>Become a Legend</strong>
              </SecodaryText>

              <ActionButton
                style={{ marginTop: '0' }}
                href={process.env.NEXT_PUBLIC_BASE_URL}
              >
                Quero conhecer a ferramenta
              </ActionButton>
            </Box>

            <Box
              sx={{
                position: 'relative',
                flex: 1,
                minHeight: '300px',
                minWidth: '400px',
              }}
            >
              <Image
                alt="mentorfy-representation"
                src="/images/lp-main-image.png"
                fill
                style={{
                  zIndex: '4',
                  marginTop: '2rem',
                  objectFit: 'contain',
                }}
              />
            </Box>
            {!isMobile && (
              <>
                <OrangeGradient id="orange" />
                <Image
                  alt="background-mountain"
                  src="/images/lp-mountain.png"
                  width={1000}
                  height={404}
                  style={{
                    position: 'absolute',
                    zIndex: '3',
                    top: '45%',
                    right: '-9%',
                  }}
                />
              </>
            )}
          </ContentHolder>
        </Introduction>
        <SecondSection>
          <ContentHolder noreverse="noreverse">
            <Box>
              <Image
                alt="become-legend"
                src="/images/lp-become-legend.png"
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
                alt="mentors-group"
                src="/images/mentors-group.png"
                quality={100}
                width={isMobile ? 284 : 500}
                height={isMobile ? 284 : 500}
              />
            </Box>
            <Box sx={{ alignSelf: 'end' }}>
              <MainText sx={{ maxWidth: '450px' }}>
                Sua jornada n??o precisa ser solit??ria!
              </MainText>
              <SecondSectionText>
                A <strong>Mentorfy</strong> foi criada de um mentor para
                mentores, nosso m??todo de gest??o de produtos de orienta????o j??
                tirou mais de 1200 projetos do papel.
                <span>
                  Inovamos a forma de se entregar ?? mentoria, com escala e
                  previsibilidade para que voc?? mentor preocupe-se apenas em
                  gerar solu????es e boas ideias.
                </span>
                <span>
                  Estamos prontos para lhe apoiar desde os seus primeiros passos
                  com sua experi??ncia Mentorfy, at?? estrat??gias mais avan??adas
                  para ajudar voc?? a alavancar e escalar ainda mais as suas
                  vendas!
                </span>
              </SecondSectionText>
              <ActionButton
                sx={{ marginBottom: '1.5rem' }}
                href={process.env.NEXT_PUBLIC_BASE_URL}
              >
                Ver demonstra????o
              </ActionButton>
            </Box>
          </ContentHolder>
        </SecondSection>
        <ClientSupport>
          <ContentHolder>
            <Container>
              <Image
                alt="callphone"
                src="/images/cellphone.png"
                width={isMobile ? 288 : 400}
                height={isMobile ? 320 : 430}
                style={{
                  zIndex: '2',
                  marginTop: `${isMobile ? '0' : '-15%'}`,
                  left: '4%',
                }}
              />
              <Box sx={{ width: `${isMobile ? '100%' : '50%'}` }}>
                <MainText mb={4}>
                  Conte com o melhor suporte que voc?? jamais imaginou existir.
                </MainText>
                <SecodaryText>
                  Crie sua conta e receba ainda hoje o acesso ao nosso WhatsApp
                  com a nossa equipe!
                </SecodaryText>
              </Box>
            </Container>
          </ContentHolder>
        </ClientSupport>
        <Features>
          <OrangeGradient
            id="orange"
            sx={{
              zIndex: '0',
              left: '-40%',
              top: '30%',
            }}
          />
          <Image
            alt="become-legend"
            src="/images/lp-become-legend.png"
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
          <ContentHolder features="features">
            <Box sx={{ textAlign: 'center' }}>
              <MainText>
                Funcionalidades que entregam a melhor experi??ncia e aumentam o
                engajamento dos seus mentorados.
              </MainText>
            </Box>
            <FeaturesContainer>
              {MainFeatures.map((feature) => (
                <FeatureWrapper key={feature.label}>
                  <IconWrapper>
                    <Image
                      alt="feature-icon"
                      src={feature.icon}
                      width={22}
                      height={24}
                    />
                  </IconWrapper>
                  <FeatureText>{feature.label}</FeatureText>
                </FeatureWrapper>
              ))}
            </FeaturesContainer>
          </ContentHolder>
        </Features>
        <Features sx={{ marginTop: '6rem' }}>
          <OrangeGradient
            id="orange"
            sx={{
              zIndex: '0',
              right: '-40%',
            }}
          />
          <ContentHolder features="features">
            <Box sx={{ textAlign: 'center' }}>
              <MainText>Funcionalidades Mentor</MainText>
            </Box>
            <FeaturesContainer>
              {MentorFeatures.map((feature) => (
                <FeatureWrapper key={feature.label} sx={{ width: '300px' }}>
                  <IconWrapper>
                    <Image
                      alt="feature-icon"
                      src={feature.icon}
                      width={22}
                      height={24}
                    />
                  </IconWrapper>
                  <FeatureText>{feature.label}</FeatureText>
                </FeatureWrapper>
              ))}
            </FeaturesContainer>
          </ContentHolder>
        </Features>
        <Features sx={{ marginTop: '6rem' }}>
          <ContentHolder features="features">
            <Box sx={{ textAlign: 'center' }}>
              <MainText>
                Funcionalidades que entregam a melhor experi??ncia e aumentam o
                engajamento dos seus mentorados.
              </MainText>
            </Box>
            <FeaturesContainer>
              {SalesFeatures.map((feature) => (
                <FeatureWrapper key={feature.label} sx={{ width: '300px' }}>
                  <IconWrapper>
                    <Image
                      alt="feature-icon"
                      src={feature.icon}
                      width={22}
                      height={24}
                    />
                  </IconWrapper>
                  <FeatureText>{feature.label}</FeatureText>
                </FeatureWrapper>
              ))}
            </FeaturesContainer>

            <ActionButton
              sx={{ width: '150px' }}
              href={process.env.NEXT_PUBLIC_BASE_URL}
            >
              Ver detalhes
            </ActionButton>
          </ContentHolder>
          <Image
            alt="background-mountain"
            src="/images/lp-mountain.png"
            width={1000}
            height={404}
            style={{
              position: 'absolute',
              zIndex: '0',
              top: '45%',
              right: '0%',
            }}
          />
        </Features>
        <Integrations>
          <ContentHolder noreverse="noverese">
            <Box>
              <Image
                alt="integra????es"
                src="/images/integrations.png"
                quality={100}
                width={isMobile ? 284 : 500}
                height={isMobile ? 320 : 500}
              />
            </Box>
            <Box sx={{ alignSelf: 'end' }}>
              <MainText>
                Integra????o Simples com Plataformas de Pagamentos.
              </MainText>
              <SecondSectionText sx={{ margin: '2rem 0' }}>
                Hotmart, Eduzz, D. Manager Guru, Abmex, Appmax, Asaas, Blitz
                Pay, Braip, Chegow, Doppus, Kiwify, Monetizze, Perfect Pay,
                Proluno, Stripe, Ticto, Yampi
                <strong>
                  {' '}
                  N??o encontrou o seu Gateway? N??s integramos para voc??!
                </strong>
              </SecondSectionText>
              <ActionButton
                sx={{ marginBottom: '4rem' }}
                href={process.env.NEXT_PUBLIC_BASE_URL}
              >
                Ver demonstra????o
              </ActionButton>
            </Box>
          </ContentHolder>
        </Integrations>
        <VideoSection>
          <OrangeGradient
            id="orange"
            sx={{
              left: '12%',
              top: `${isMobile ? '20%' : '0'}`,
              zIndex: '0',
            }}
          />
          <Image
            alt="background-mountain"
            src="/images/lp-mountain.png"
            width={800}
            height={300}
            style={{
              position: 'absolute',
              zIndex: '2',
              top: '65%',
              left: '-30%',
            }}
          />
          <MainText color="accent.main">N??o fique na curiosidade.</MainText>
          <SecondSectionText sx={{ zIndex: '1', textAlign: 'center' }}>
            Inspire-se nos exemplos de ??reas de mentoria pr?? configuradas que
            deixamos criados para voc??.
          </SecondSectionText>
          <Box
            sx={{
              background: 'gray',
              aspectRatio: '16/9',
              width: '60%',
              zIndex: '3',
            }}
          ></Box>
          <ActionButton
            sx={{ margin: '3rem 0', zIndex: '3' }}
            href={process.env.NEXT_PUBLIC_BASE_URL}
          >
            {' '}
            Ver demonstra????o
          </ActionButton>
        </VideoSection>
        <FAQ>
          <QuestionsWrapper>
            <MainText sx={{ marginTop: '-28px' }}>
              Perguntas Frequentes
            </MainText>
            <FAQText>F.A.Q</FAQText>
            <QuestionsHolder>
              {FAQList.map((question) => (
                <div
                  key={question.question}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Question onClick={() => handleCollapse(question.question)}>
                    <Typography
                      color="accent.main"
                      fontWeight={700}
                      fontSize={`${isMobile ? '1.2rem' : '1.5rem'}`}
                    >
                      {question.question}
                    </Typography>
                    <IconButton sx={{ color: 'accent.main' }}>
                      {questionId === question.question && collapse ? '-' : '+'}
                    </IconButton>
                  </Question>
                  <Collapse
                    in={questionId === question.question && collapse}
                    timeout={300}
                    sx={{ marginBottom: '2rem' }}
                  >
                    <AnswerWrapper>
                      <SecondSectionText>{question.answer}</SecondSectionText>
                    </AnswerWrapper>
                  </Collapse>
                </div>
              ))}
            </QuestionsHolder>
          </QuestionsWrapper>
        </FAQ>
      </Wrapper>
    </ThemeProvider>
  );
}
