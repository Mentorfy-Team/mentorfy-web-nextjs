import Box from '@mui/material/Box';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type Props = {
  isNegative?: string;
};
export const IndicatorsWrapper = styled(Box)`
  display: flex;
  gap: 1.2rem;
  margin: 1.2rem 0;
`;

export const Indicator = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: 118px;
  padding: 1.2rem 1.4rem;
  width: 259px;
`;

export const IndicatorValue = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 110.52%;
`;

export const IndicatorPercent = styled(Typography) <Props>`
  color: ${({ theme }) => theme.palette.failure.main};
  font-size: 16px;
  font-weight: 700;
  line-height: 110.52%;

  ${({ isNegative }) =>
    !!isNegative &&
    css`
      color: #00d75b;
    `}
`;

export const IndicatorTitle = styled(Typography) <Props>`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 18px;
  font-weight: 500;
  line-height: 110.52%;
`;

export const ImagesBox = styled(Box) <Props>`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex: 1;
  gap: 0.5rem;
  height: 282px;
  max-width: 310px;
`;

export const BannerWrapper = styled(Box)`
  max-width: 1900px;
  height: 300px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
  background-image: url("/images/montanha.png");
  background-size: cover;
  padding: 2.5rem 3rem 0;
  display: flex;
  overflow-y: auto;
`;

export const TextsWrapper = styled(Box)`
  text-align: start;
  display: flex;
  flex-direction: column;
`;
export const NameWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MentorName = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 110.52%;
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const WelcomeText = styled(Typography)`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 110.52%;
  margin: 0.7rem 0 2rem;

`;

export const DescriptionText = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 110.52%;
  color: ${({ theme }) => theme.palette.caption.main};
  text-align: justify;
  width: 80%;
`;
