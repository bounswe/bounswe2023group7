import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '85vh',
          padding: '2rem',
          color: 'dark grey',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
            Welcome!
          </Typography>
          <Typography variant="h4" component="p" gutterBottom>
            Here is our APIs:
          </Typography>
        
          <Box
  sx={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  }}
>
  <Button
    variant="contained"
    component={Link}
    to="/elif"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF' ,  minWidth: '260px'}}
  >
    Elif Kızılkaya
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/game-platform"
    sx={{ backgroundColor: '#616161', color: '#FFFFFF', minWidth: '260px'}}
  >
    Game Platform by Altug
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/favorite-games"
    sx={{ backgroundColor: '#757575', color: '#FFFFFF' , minWidth: '260px'}}
  >
    Favorite Games
  </Button>
</Box>
<Box
  sx={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  }}
>
  <Button
    variant="contained"
    component={Link}
    to="/melih"
    sx={{ backgroundColor: '#9E9E9E', color: '#FFFFFF' , minWidth: '260px'}}
  >
    Melih Gezer
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/tayyip"
    sx={{ backgroundColor: '#ADADAD', color: '#FFFFFF' , minWidth: '260px' }}
  >
    Muhammet Tayyip Kamiloğlu
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/furkan"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF' , minWidth: '260px' }}
  >
    Furkan Ülke
  </Button>
</Box>
<Box
  sx={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  }}
>
  <Button
    variant="contained"
    component={Link}
    to="/sena"
    sx={{ backgroundColor: '#707070', color: '#FFFFFF' , minWidth: '260px' }}
  >
    Fatma Sena Alçı
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/hakan"
    sx={{ backgroundColor: '#636363', color: '#FFFFFF' , minWidth: '260px'}}
  >
    Hakan Karakuş
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/guney"
    sx={{ backgroundColor: '#808080', color: '#FFFFFF', minWidth: '260px' }}
  >
    Güney Yüksel
  </Button>
</Box>
<Box
  sx={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  }}
>
  <Button
    variant="contained"
    component={Link}
    to="/tuluyhan"
    sx={{ backgroundColor: '#808080', color: '#FFFFFF', minWidth: '260px' }}
  >
    Mehmet Tuluyhan Sözen
  </Button>
</Box>


        </Box>
      </Box>
    </>
  );
};

export default LandingPage;