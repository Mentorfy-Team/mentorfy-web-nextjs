import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScrollArea } from './styles';

type props = {
  children: any;
  maxWidth?: number | string;
  withToolBar?: boolean;
  sx?: any;
};

const ContentWidthLimit: React.FC<props> = ({
  children,
  sx,
  maxWidth = 1280,
  withToolBar = true,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box id="ContentWidthLimit" sx={{ textAlign: '-webkit-center' }} {...sx}>
      <ScrollArea
        id="ScrollArea"
        sx={{
          padding: '0 2rem',
          maxWidth: `${maxWidth}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
        withtoolbar={withToolBar ? 'true' : 'false'}
      >
        {children}
        <Box height="1rem" />
      </ScrollArea>
    </Box>
  );
};

export default ContentWidthLimit;
