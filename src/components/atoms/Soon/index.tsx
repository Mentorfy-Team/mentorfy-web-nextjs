import Box from '@mui/material/Box';
import React from 'react';

const Soon = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        // background blur
        backdropFilter: 'blur(2px)',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#ffffff6c',
      }}
    >
      {children}
    </Box>
  );
};

export default Soon;
