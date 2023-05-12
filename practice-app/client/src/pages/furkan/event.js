import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';





const EventMainPage = () => {
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
            You Can Create Events and List Events Created up to now.
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
    to="/event/createEvent"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF' ,  minWidth: '260px', fontFamily: "Trebuchet MS"}}
  >
    Create a New Event
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/event/listEvent"
    sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '260px', fontFamily: "Trebuchet MS"}}
  >
    List Events
  </Button>
</Box>



        </Box>
      </Box>
    </>
  );
};

export default EventMainPage;