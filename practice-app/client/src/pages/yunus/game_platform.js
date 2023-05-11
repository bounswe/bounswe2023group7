import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';





const PlatformMainPage = () => {
  console.log("asasa")
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h4" component="p" gutterBottom sx={{ textAlign: 'center', color: "white", fontFamily: "Trebuchet MS" }}>
            You Can Do These
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
    to="/game-platform/search"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF' ,  minWidth: '260px', fontFamily: "Trebuchet MS"}}
  >
    Search A Game's Platform
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/game-platform/add_platforms"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '260px', fontFamily: "Trebuchet MS"}}
  >
    Add Your Platform
  </Button>
</Box>



        </Box>
      </Box>
    </>
  );
};

export default PlatformMainPage;