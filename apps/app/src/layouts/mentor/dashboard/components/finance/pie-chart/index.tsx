import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { LegendColor, LegendItem, LegendText, LegendValue, LegendWrapper, Wrapper } from './styles';

const PieChart = () => {

    const data = [
        { name: 'Cartão de Crédito', amount: 25, color: '#E33A41' },
        { name: 'Pix', amount: 25, color: '#59AB61' },
        { name: 'Boleto', amount: 25, color: '#7586EC' },
        { name: 'Parcela Flexível', amount: 25, color: '#EF9658' },
    ];

    const width = 190;
    return (
        <Wrapper>
            <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ marginBottom: '0.9rem' }}>Origens de receita</Typography>

                <LegendWrapper>
                    {data.map((data) => (
                        <LegendItem key={data.name}>
                            <LegendColor sx={{ backgroundColor: `${data.color}` }} />
                            <Box sx={{ textAlign: 'left' }}>
                                <LegendText>{data.name}</LegendText>
                                <LegendValue>{data.amount + '%'}</LegendValue>
                            </Box>
                        </LegendItem>
                    ))}
                </LegendWrapper>
            </Box>
            <Box>
                <svg width={width} height={width}>
                    <Group top={(width) / 2} left={(width) / 2} >
                        <Pie
                            data={data}
                            pieValue={(data) => data.amount}
                            outerRadius={(width / 2)}
                            innerRadius={(width / 2) - 30}
                        >
                            {pie => {
                                return pie.arcs.map(arc => {
                                    return <g key={arc.data.name}>
                                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                                    </g>;
                                });
                            }}
                        </Pie>
                    </Group>
                </svg>
            </Box>
        </Wrapper>
    );
};

export default PieChart;
