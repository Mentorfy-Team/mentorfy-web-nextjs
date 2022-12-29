import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useProfile } from '@app/hooks/useProfile';

// import { Container } from './styles';

const Comments = ({ comments }) => {
  const {
    data: { profile },
  } = useProfile();

  return (
    <>
      <Box
        sx={{
          marginTop: '2.0rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {comments
          ?.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .map(({ comment, created_at }, index) => (
            <>
              <Box sx={{ width: '100%', display: 'flex', gap: '1rem' }}>
                <Avatar src={profile?.avatar} />
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ marginTop: '-0.2rem' }}
                  >
                    {profile?.name}
                    <Typography ml={3} color="gray" variant="caption">
                      {new Date(created_at).toLocaleString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Typography>
                  </Typography>
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ marginTop: '-0.3rem' }}
                  >
                    {comment}
                  </Typography>
                </Box>
              </Box>
            </>
          ))}
      </Box>
    </>
  );
};

export default Comments;
