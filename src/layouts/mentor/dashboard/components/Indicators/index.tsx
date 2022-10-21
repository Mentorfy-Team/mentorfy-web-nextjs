import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { ArrowBox, Indicator, IndicatorPercent, IndicatorTitle, IndicatorValue, RedArrowBox, Wrapper } from './styles';

const Indicators = () => {
    const [red, setRed] = useState(false);

    return (
        <Wrapper>
            <Indicator>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IndicatorValue>R$12.34</IndicatorValue>
                        <IndicatorPercent isNegative>+3.42%</IndicatorPercent>
                    </Box>
                    <IndicatorTitle>Faturamento</IndicatorTitle>
                </Box>

                <ArrowBox>
                    <Image alt='arrow' width={14} height={14} src={'/svgs/diagonal-green-arrow.svg'}/>
                </ArrowBox>
            </Indicator>
            <Indicator>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IndicatorValue>R$12.34</IndicatorValue>
                        <IndicatorPercent>+3.42%</IndicatorPercent>
                    </Box>
                    <IndicatorTitle>Ganhos</IndicatorTitle>
                </Box>

                <RedArrowBox>
                    <Image alt='arrow' width={14} height={14} src='/svgs/diagonal-red-arrow.svg'/>
                </RedArrowBox>
            </Indicator>
            <Indicator>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IndicatorValue>R$12.34</IndicatorValue>
                        <IndicatorPercent>+3.42%</IndicatorPercent>
                    </Box>
                    <IndicatorTitle>Clientes Ativos</IndicatorTitle>
                </Box>

                <RedArrowBox>
                    <Image alt='arrow' width={14} height={14} src='/svgs/diagonal-red-arrow.svg'/>
                </RedArrowBox>
            </Indicator>
            <Indicator>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IndicatorValue>R$12.34</IndicatorValue>
                        <IndicatorPercent isNegative>+3.42%</IndicatorPercent>
                    </Box>
                    <IndicatorTitle>Conversão checkout</IndicatorTitle>
                </Box>

                <ArrowBox>
                    <Image alt='arrow' width={14} height={14} src='/svgs/diagonal-green-arrow.svg'/>
                </ArrowBox>
            </Indicator>
        </Wrapper>
    );
};

export default Indicators;
