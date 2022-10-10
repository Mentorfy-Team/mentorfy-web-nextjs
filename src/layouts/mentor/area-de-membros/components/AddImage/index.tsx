import { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AddImgButton, ButtonLabel } from './styles';

type Props = {
  onUploadImage: (file: any) => void;
  thumbnail: string;
};

const AddImage: FC<Props> = ({ onUploadImage, thumbnail }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
      <Image
        alt=""
        src={thumbnail || '/svgs/step-image.svg'}
        width={100}
        height={70}
        objectFit="contain"
      ></Image>
      <Box
        sx={{
          marginLeft: '0.5rem',
          textAlign: 'left',
          color: `${theme.palette.text.primary}`,
        }}
      >
        <Typography sx={{ fontWeight: '700', fontSize: '1rem' }}>
          Banner
        </Typography>
        <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
          Recomendação: 70x70 pixels
        </Typography>
        <AddImgButton
          onChange={(e) => onUploadImage(e.target)}
          variant="outlined"
        >
          <ButtonLabel htmlFor="upload-image">Adicionar Imagem</ButtonLabel>
          <input hidden accept="image/*" type="file" id="upload-image" />
        </AddImgButton>
      </Box>
    </Box>
  );
};

export default AddImage;
