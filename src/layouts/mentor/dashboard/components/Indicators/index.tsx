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
  Wrapper,
} from './styles';

const Indicators = () => {
  const [red, setRed] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper container spacing={2}>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent isnegative="true">+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Faturamento</IndicatorTitle>
          </Box>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src={'/svgs/diagonal-green-arrow.svg'}
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Ganhos</IndicatorTitle>
          </Box>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src="/svgs/diagonal-red-arrow.svg"
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent>+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Clientes Ativos</IndicatorTitle>
          </Box>

          <ArrowBox>
            <Image
              alt="arrow"
              width={14}
              height={14}
              src="/svgs/diagonal-red-arrow.svg"
            />
          </ArrowBox>
        </Card>
      </Indicator>
      <Indicator xs={12} md={6} lg={3}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndicatorValue>R$12.34</IndicatorValue>
              <IndicatorPercent isnegative="true">+3.42%</IndicatorPercent>
            </Box>
            <IndicatorTitle>Conversão checkout</IndicatorTitle>
          </Box>

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
