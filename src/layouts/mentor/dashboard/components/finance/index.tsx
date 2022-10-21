import Box from '@mui/material/Box';
import PieChart from './pie-chart';
import { Amount, BarLegend, BarWrapper, ProgressBar, Revenue, RevenueTitle, TextAmount, Wrapper } from './styles';
import Wallet from './wallet';

const Finances = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Wrapper>
                <Revenue>
                    <RevenueTitle>Resumo de seus ganhos líquidos</RevenueTitle>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ textAlign: 'right' }}>
                            <TextAmount>Ganhos como produtor</TextAmount>
                            <Amount>R$12.340,00</Amount>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <TextAmount>Ganhos como co-produtor</TextAmount>
                            <Amount>R$12.340,00</Amount>
                        </Box>
                    </Box>

                    <BarWrapper>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <BarLegend>Novice</BarLegend>
                            <BarLegend>Pro</BarLegend>
                        </Box>
                        <ProgressBar variant='determinate' value={40} />

                        <Box sx={{ textAlign: 'right' }}>
                            <TextAmount>Total de Ganhos</TextAmount>
                            <Amount>R$24.680,00</Amount>
                        </Box>
                    </BarWrapper>
                </Revenue>

                <PieChart />
            </Wrapper>
            <Wallet/>
        </Box>
    );
};

export default Finances;
