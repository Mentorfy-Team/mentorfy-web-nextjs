import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const SvgWrapper = styled(Box)`
  position: absolute;
  svg {
    #TRILHA {
      #Caminho-Jornada {
        // linear gradient
        stroke: url(#linear-gradient);
      }
    }
    /* stroke-dasharray: 100;
    stroke-dashoffset: calc(221px - (221px * 30 / 100)); */
  }
`;
