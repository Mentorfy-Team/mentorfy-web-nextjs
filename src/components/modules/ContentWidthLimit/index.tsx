import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScrollArea } from './styles';

type props = {
  children: any;
  maxWidth?: number;
};

const ContentWidthLimit: React.FC<props> = ({ children, maxWidth = 1120 }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box id="ContentWidthLimit" sx={{ textAlign: '-webkit-center' }}>
      <ScrollArea
        id="ScrollArea"
        sx={{
          padding: '0 2rem',
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
