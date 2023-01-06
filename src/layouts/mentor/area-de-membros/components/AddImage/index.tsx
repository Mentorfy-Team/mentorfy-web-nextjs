import { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AddImgButton, ButtonLabel } from './styles';
import { Close } from '@mui/icons-material';
import { RemoveBox } from '../DownloadFileModal/styles';

type Props = {
  onUploadImage: (file: any) => void;
  thumbnail: string;
  title?: string;
  isBlocked?: boolean;
  defaultImage?: string;
  onRemove?: (sourceUrl: string) => void;
};

const AddImage: FC<Props> = ({
  onUploadImage,
  thumbnail,
  title,
  isBlocked,
  defaultImage = '/svgs/step-image.svg',
  onRemove,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: '1rem',
        width: '100%',
      }}
    >
      <Box position="relative">
        {thumbnail && (
          <RemoveBox
            sx={{
              right: -10,
              top: 1,
            }}
            onClick={() => onRemove(thumbnail)}
          >
            <Close
              sx={{
                height: '1rem',
                paddingRight: '0.3rem',
                paddingBottom: '0rem',
              }}
            />
          </RemoveBox>
        )}
        <Image
          alt=""
          src={thumbnail || defaultImage}
          width={80}
          height={80}
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          marginLeft: '1.2rem',
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
