import Box from '@mui/material/Box';
import { AbsolutePosition } from '../styles';
import dynamic from 'next/dynamic';

const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false },
);
import Button from '@mui/material/Button';

export const ColorPicker = ({ colorPick, onChange, open, setOpen }) => {
  return (
    <Box id="ColorOne" sx={{ position: 'relative' }}>
      <Box
        width="1.5rem"
        height="1.5rem"
        mt={1}
        sx={{
          border: '2px solid #ffffff',
          borderRadius: '10%',
          padding: '5px',
          background: colorPick || '#d4d4d4',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      ></Box>
      {open && (
        <>
          <AbsolutePosition
            sx={{
              bottom: '40px',
              pointerEvents: 'auto',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'flex-end',
              borderRadius: '5px',
            }}
          >
            <SketchPicker
              styles={{
                default: {
                  picker: {
                    boxShadow: 'none',
                  },
                },
              }}
              color={colorPick || '#d4d4d4'}
              onChange={(color) => {
                onChange(color);
              }}
            />
            <Button onClick={() => setOpen(!open)} variant="contained">
              Confirmar
            </Button>
          </AbsolutePosition>
        </>
      )}
    </Box>
  );
};
