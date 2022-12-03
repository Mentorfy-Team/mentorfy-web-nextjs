import Box from '@mui/material/Box';
import Image from 'next/image';
import {
  Amount,
  BarWrapper,
  MountainName,
  MountainsWrapper,
  ProgressBar,
  Revenue,
  RevenueTitle,
  TextAmount,
  TheMountainWrapper,
  Wrapper,
} from './styles';
import Wallet from './wallet';

const Finances = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1.2rem',
        flexWrap: 'wrap',
      }}
    >
      <Wrapper>
        <Revenue>
          <RevenueTitle>Resumo de seus ganhos líquidos</RevenueTitle>

          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <Box>
              <TextAmount>Ganhos como produtor</TextAmount>
              <Amount>R$12.340,00</Amount>
            </Box>
            <Box>
              <TextAmount>Ganhos como co-produtor</TextAmount>
              <Amount>R$12.340,00</Amount>
            </Box>
          </Box>

          <BarWrapper>
            <MountainsWrapper>
              <TheMountainWrapper>
                <Image
                  alt="monte-fugi"
                  src="/svgs/monte-fugi.svg"
                  width={60}
                  height={40}
                  style={{ marginBottom: '-0.5rem' }}
                />
                <MountainName>FUGI</MountainName>
              </TheMountainWrapper>
              <TheMountainWrapper>
                <Image
                  alt="monte-fugi"
                  src="/svgs/kilimanjaro.svg"
                  width={60}
                  height={40}
                  style={{ marginBottom: '-0.6rem' }}
                />
                <MountainName>KILIMANJARO</MountainName>
              </TheMountainWrapper>
              <TheMountainWrapper>
                <Image
                  alt="monte-fugi"
                  src="/svgs/monte-olimpo.svg"
                  width={60}
                  height={40}
                />
                <MountainName>OLIMPO</MountainName>
              </TheMountainWrapper>
              <TheMountainWrapper>
                <Image
                  alt="monte-fugi"
                  src="/svgs/monte-everest.svg"
                  width={60}
                  height={40}
                />
                <MountainName>EVEREST</MountainName>
              </TheMountainWrapper>
              <TheMountainWrapper>
                <Image
                  alt="monte-fugi"
                  src="/svgs/monte-k2.svg"
                  width={60}
                  height={40}
                />
                <MountainName>K2</MountainName>
              </TheMountainWrapper>
            </MountainsWrapper>
            <ProgressBar variant="determinate" value={40} />

            <Box sx={{ textAlign: 'right' }}>
              <TextAmount>Total de Ganhos</TextAmount>
              <Amount>R$24.680,00</Amount>
            </Box>
          </BarWrapper>
        </Revenue>

        {/* <PieChart /> */}
      </Wrapper>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Wallet />
      </Box>
    </Box>
  );
};

export default Finances;
