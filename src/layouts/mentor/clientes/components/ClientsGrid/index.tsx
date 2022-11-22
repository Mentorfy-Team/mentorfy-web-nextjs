import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Item, TextWrapper } from './styles';
import ClientsSvg from '~/../public/svgs/clients';
import GraduationCapSvg from '~/../public/svgs/graduation-cap';
import RocketSvg from '~/../public/svgs/rocket';

const ClientsGrid = ({ mentorados = 0, alunos = 0, acessos = 0 }) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const scale = isMobile ? 1 : 3;
  return (
    <Grid container mt={0} spacing={0}>
      <Grid p={isMobile ? 0 : 0} pr={1 * scale} xs={4} lg={4}>
        <Item>
          <TextWrapper>
            <Typography variant="body2">Total de Mentorados</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}>
              {mentorados}
            </Typography>
          </TextWrapper>

          {!isMobile && <GraduationCapSvg height={40} width={40} />}
        </Item>
      </Grid>

      <Grid
        p={isMobile ? 0 : null}
        pr={0.5 * scale}
        pl={0.5 * scale}
        xs={4}
        lg={4}
      >
        <Item>
          <TextWrapper>
            <Typography variant="body2">Total de Alunos</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}>
              {alunos}
            </Typography>
          </TextWrapper>

          {!isMobile && <ClientsSvg height={40} width={40} />}
        </Item>
      </Grid>

      <Grid p={isMobile ? 0 : null} pl={1 * scale} xs={4} lg={4}>
        <Item>
          <TextWrapper>
            <Typography variant="body2">Total de Acessos</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}>
              {acessos}
            </Typography>
          </TextWrapper>

          {!isMobile && <RocketSvg height={32} width={32} />}
        </Item>
      </Grid>
    </Grid>
  );
};

export default ClientsGrid;
