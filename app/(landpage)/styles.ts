import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
  noreverse?: string;
  features?: string;
};

export const Wrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  min-height: 100vh;
  overflow: hidden;
`;

export const ContentHolder = styled(Box)<Props>`
  max-width: 1380px;
  display: flex;
  gap: 2rem;
  overflow-x: visible;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
  }
  ${({ noreverse }) =>
    noreverse &&
    css`
      @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
      }
    `}
  ${({ features }) =>
    features &&
    css`
      flex-direction: column;
      align-items: center;

      @media (max-width: 1200px) {
        flex-direction: column;
      }
    `}
`;

export const OrangeGradient = styled(Box)`
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fe7d22 -50%,
    rgba(254, 125, 34, 0) 100%
  );
  width: 700px;
  height: 700px;
  opacity: 0.8;
  position: absolute;
  z-index: 2;
  top: 5%;
  right: -25%;
  @media (max-width: 1200px) {
    width: 350px;
    height: 350px;
  }
`;

export const Introduction = styled('main')`
  padding: 3rem 0 2rem 2rem;
  display: flex;
  gap: 1rem;
  position: relative;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 0 1rem;
  }
`;

export const SecodaryText = styled(Typography)`
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 1.8rem;

  strong {
    display: block;
    margin-top: 0.5rem;
  }
`;

export const MainText = styled(Typography)`
  font-weight: 700;
  font-size: 2.5rem !important;
  line-height: 2.8rem;

  @media (max-width: 1200px) {
    font-size: 2rem !important;
  }
`;

export const ActionButton = styled('a')`
  background-color: ${({ theme }) => theme.palette.accent.main};
  width: 320px;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
  text-decoration: none;
  color: white;
  z-index: 4;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.99);
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SecondSection = styled('section')`
  padding: 0 2rem 2rem 2rem;
  margin-top: 9rem;
  display: flex;
  gap: 4rem;
  position: relative;
  justify-content: center;

  @media (max-width: 1200px) {
    margin-top: 5rem;
  }
`;

export const SecondSectionText = styled(Typography)`
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 1.8rem;
  margin: 1.3rem 0;

  span {
    display: inline-block;
    margin: 1rem 0;
  }
  strong {
    display: inline-block;
    margin: 1rem 0;
  }
`;

export const ClientSupport = styled('section')`
  padding: 0 2rem 2rem 2rem;
  margin-top: 9rem;
  display: flex;
  gap: 4rem;
  justify-content: center;
  @media (max-width: 1200px) {
    margin-top: 5rem;
  }
`;

export const Container = styled('div')`
  background: linear-gradient(
    102deg,
    rgba(30, 30, 30, 0.2) 0%,
    rgba(49, 44, 44, 0.2) 88.63%
  );
  border: 2px solid rgba(98, 98, 98, 0.6);
  border-radius: 10px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(22.5px);
  padding: 5rem 7rem 0rem 5rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 1rem;
  }
`;

export const Features = styled('section')`
  padding: 0 2rem 2rem 2rem;
  margin-top: 9rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media (max-width: 1200px) {
    margin-top: 5rem;
  }
`;

export const FeaturesContainer = styled('div')`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 2;
`;

export const FeatureWrapper = styled('div')`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  background: rgba(30, 30, 30, 0.2);
  border: 1px solid rgba(62, 62, 62, 0.8);
  border-radius: 5px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(3px);
  padding: 1.8rem;
  width: 238px;
`;

export const FeatureText = styled(Typography)`
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.8rem;
`;

export const IconWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.accent.main};
  padding: 1rem;
  max-width: 60px;
  max-height: 60px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Integrations = styled('section')`
  padding: 0 2rem 2rem 2rem;
  margin-top: 9rem;
  display: flex;
  gap: 4rem;
  position: relative;
  justify-content: center;
`;

export const VideoSection = styled('section')`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
  position: relative;
  padding: 0 2rem;
  @media (max-width: 1200px) {
    margin-top: 2.5rem;
  }
`;

export const FAQ = styled('article')`
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

export const FAQText = styled(Typography)`
  font-weight: 800;
  font-size: 8rem;
  line-height: 2.8rem;
  opacity: 0.2;
  z-index: 1;
  margin-top: -40px;
  @media (max-width: 1200px) {
    font-size: 6rem;
    margin-top: -50px;
  }
`;

export const QuestionsWrapper = styled('div')`
  border: 1px solid rgba(96, 96, 96, 0.5);
  border-radius: 28px;
  margin: 0 auto;
  width: 70%;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

export const QuestionsHolder = styled('div')`
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  width: 100%;
  @media (max-width: 1200px) {
    padding: 2rem;
  }
`;

export const Question = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.light};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px 5px 0px 0px;
  z-index: 3;
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1200px) {
    padding: 1rem 1.5rem;
  }
`;

export const AnswerWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 0px 0px 5px 5px;
  width: 100%;
  padding: 1rem 3rem;
  text-align: left;
  @media (max-width: 1200px) {
    padding: 1rem 1.5rem;
  }
`;
