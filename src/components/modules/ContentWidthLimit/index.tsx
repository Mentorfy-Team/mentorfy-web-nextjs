import { Box, useMediaQuery } from '@mui/material';
import { ScrollArea } from './styles';

type props = {
  children: any;
  maxWidth?: number;
};

const ContentWidthLimit: React.FC<props> = ({ children, maxWidth = 1120 }) => {
  return (
    <Box id="ContentWidthLimit" sx={{ textAlign: '-webkit-center' }}>
      <ScrollArea
        id="ScrollArea"
        sx={{
          width: '90vw',
          maxWidth: `${maxWidth}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
        <Box height="1rem" />
      </ScrollArea>
    </Box>
  );
};

export default ContentWidthLimit;
