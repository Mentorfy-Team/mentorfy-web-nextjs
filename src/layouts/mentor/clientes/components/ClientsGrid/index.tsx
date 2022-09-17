import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Item, TextWrapper } from './styles';
import GraduationCapSvg from '~/../public/svgs/graduation-cap';

const ClientsGrid = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const scale = isMobile ? 1 : 3;
  return (
    <Grid container mt={0} spacing={0}>
      <Grid p={isMobile ? 0 : 0} pr={1 * scale} xs={4} lg={4}>
        <Item>
          <TextWrapper>
            <Typography variant="body2">Total de Mentorados</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}>
              273
            </Typography>
          </TextWrapper>

          {!isMobile && (
            <GraduationCapSvg height={50} width={50} fill="#1C1B20" />
          )}
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
              273
            </Typography>
          </TextWrapper>

          {!isMobile && (
            <GraduationCapSvg height={50} width={50} fill="#1C1B20" />
          )}
        </Item>
      </Grid>

      <Grid p={isMobile ? 0 : null} pl={1 * scale} xs={4} lg={4}>
        <Item>
          <TextWrapper>
            <Typography variant="body2">Total de Acessos</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}>
              273
            </Typography>
          </TextWrapper>

          {!isMobile && (
            <GraduationCapSvg height={200} width={200} fill="#1C1B20" />
          )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default ClientsGrid;
