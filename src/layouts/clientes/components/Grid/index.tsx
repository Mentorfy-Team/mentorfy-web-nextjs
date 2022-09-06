import { Grid, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { Item, TextWrapper } from './styles';
import { graduation_cap_svg } from '~/../public/svgs';

const ClientsGrid = () => {
    const isMobile = useMediaQuery('(max-width: 500px)');
    return (
        <Grid container spacing={!isMobile ? 7 : 2} >
            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>

            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>

            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>
          </Grid>
    );
};

export default ClientsGrid;
