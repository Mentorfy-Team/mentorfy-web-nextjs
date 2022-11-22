import { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AddImgButton, ButtonLabel } from './styles';

type Props = {
  onUploadImage: (file: any) => void;
  thumbnail: string;
  title?: string;
  isBlocked?: boolean;
};

const AddImage: FC<Props> = ({
  onUploadImage,
  thumbnail,
  title,
  isBlocked,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', marginBottom: '1rem', width: '100%' }}>
      <Image
        alt=""
        src={thumbnail || '/svgs/step-image.svg'}
        width={100}
        height={70}
        style={{
          objectFit: 'contain',
        }}
      ></Image>
      <Box
        sx={{
          marginLeft: '0.5rem',
          textAlign: 'left',
          color: `${theme.palette.text.primary}`,
        }}
      >
        <Typography sx={{ fontWeight: '700', fontSize: '1rem' }}>
          {title || 'Banner'}
        </Typography>
        <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
          Recomendação: 70x70 pixels
        </Typography>
        <AddImgButton
          onChange={(e) => onUploadImage(e.target)}
          variant="outlined"
          disabled={isBlocked}
          loading={isBlocked}
        >
          {!isBlocked && (
            <ButtonLabel htmlFor={'upload-image' + title}>
              Adicionar Imagem
            </ButtonLabel>
          )}
          <input
            hidden
            accept="image/*"
            type="file"
            id={'upload-image' + title}
          />
        </AddImgButton>
      </Box>
    </Box>
  );
};

export default AddImage;
