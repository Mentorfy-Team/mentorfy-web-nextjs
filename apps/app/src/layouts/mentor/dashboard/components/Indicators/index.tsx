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
import Soon from '@app/components/atoms/Soon';

const Indicators = () => {
  const [red, setRed] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper container spacing={2}>
      <Indicator xs={12} md={6} lg={3}>
        <Soon>Em breve</Soon>
        <Card>
          <NumbersWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$00.00</IndicatorValue>
              <IndicatorPercent>+0.00%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Faturamento</IndicatorTitle>
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
      <Indicator xs={12} md={6} lg={3}>
        <Soon>Em breve</Soon>
        <Card>
          <NumbersWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$00.00</IndicatorValue>
              <IndicatorPercent>+0.00%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Ganhos</IndicatorTitle>
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
      <Indicator xs={12} md={6} lg={3}>
        <Soon>Em breve</Soon>
        <Card>
          <NumbersWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>0000</IndicatorValue>
              <IndicatorPercent>+0.00%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Clientes Ativos</IndicatorTitle>
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
      <Indicator xs={12} md={6} lg={3}>
        <Soon>Em breve</Soon>
        <Card>
          <NumbersWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$00.00</IndicatorValue>
              <IndicatorPercent>+0.00%</IndicatorPercent>
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
