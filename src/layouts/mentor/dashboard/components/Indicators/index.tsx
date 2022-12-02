import { useState } from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import {
  ArrowBox,
  Card,
  Indicator,
  IndicatorPercent,
  IndicatorTitle,
  IndicatorValue,
  NumbersWrapper,
  Wrapper,
} from './styles';

const Indicators = () => {
  const [red, setRed] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper container spacing={2}>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <NumbersWrapper
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Faturamento</IndicatorTitle>
          </NumbersWrapper>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src='/svgs/diagonal-green-arrow.svg'
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <NumbersWrapper
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Ganhos</IndicatorTitle>
          </NumbersWrapper>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src='/svgs/diagonal-green-arrow.svg'
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <NumbersWrapper
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Clientes Ativos</IndicatorTitle>
          </NumbersWrapper>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src='/svgs/diagonal-green-arrow.svg'
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <NumbersWrapper
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Conversão checkout</IndicatorTitle>
          </NumbersWrapper>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src="/svgs/diagonal-green-arrow.svg"
            />
          </ArrowBox>
        </Card>
      </Indicator>
    </Wrapper>
  );
};

export default Indicators;
