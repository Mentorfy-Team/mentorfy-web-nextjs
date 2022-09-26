import { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AddImgButton } from './styles';

const AddImage: FC = () => {
<<<<<<< HEAD
    const theme = useTheme();
    return(
        <Box sx={{ display: 'flex' }}>
                <Image
                  alt=""
                  src="/svgs/step-image.svg"
                  width={70}
                  height={70}
                ></Image>
                <Box
                  sx={{
                    textAlign: 'left',
                    color: `${theme.palette.text.primary}`,
                  }}
                >
                  <Typography sx={{fontWeight: '700', fontSize: '1rem'}}>Thumbnail</Typography>
                  <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
                    Recomendação: 70x70 pixels
                  </Typography>
                  <AddImgButton variant='outlined'>Adicionar Imagem</AddImgButton>
                </Box>
              </Box>
    );
=======
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Image alt="" src="/svgs/step-image.svg" width={70} height={70}></Image>
      <Box
        sx={{
          textAlign: 'left',
          color: `${theme.palette.text.primary}`,
        }}
      >
        <Typography sx={{ fontWeight: '700', fontSize: '1rem' }}>
          Thumbnail
        </Typography>
        <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
          Recomendação: 70x70 pixels
        </Typography>
        <AddImgButton variant="outlined">Adicionar Imagem</AddImgButton>
      </Box>
    </Box>
  );
>>>>>>> 1c5524ca6ac1118730595ff725724f9b0c3912d4
};

export default AddImage;
