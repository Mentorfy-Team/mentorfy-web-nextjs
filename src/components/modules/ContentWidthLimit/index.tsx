import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScrollArea } from './styles';

type props = {
  children: any;
  maxWidth?: number | string;
  withToolBar?: boolean;
  withoutScroll?: boolean;
  sx?: any;
};

const ContentWidthLimit: React.FC<props> = ({
  children,
  sx,
  maxWidth = 4096,
  withToolBar = true,
  withoutScroll = false,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box id="ContentWidthLimit" sx={{ textAlign: '-webkit-center' }} {...sx}>
      <ScrollArea
        id="ScrollArea"
        sx={{
          padding: '0.5rem 1rem',
          maxWidth: `${maxWidth}px`,
          display: 'flex',
          flexDirection: 'column',
          overflowY: withoutScroll ? 'hidden' : 'auto',
        }}
        withtoolbar={withToolBar ? 'true' : 'false'}
        withscroll={!withoutScroll ? 'true' : 'false'}
      >
        {children}
        <Box height="1rem" />
      </ScrollArea>
    </Box>
  );
};

export default ContentWidthLimit;
