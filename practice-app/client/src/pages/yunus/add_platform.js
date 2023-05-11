import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField  from '@mui/material/TextField';



const AddPlatform = () => {
  
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
              SUBMIT THE PLATFORM
            </Typography>
          
            <Box
    sx={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '1rem',
    }}
  >
    <TextField sx={{ label: { color: 'white',fontFamily: "Trebuchet MS"} }} id="outlined-basic" label="Give Your Keyword" variant="outlined" />
    <Button
      variant="contained"
      component={Link}
      to="/list_games"
      sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS"}}
    >
      Add
    </Button>
  </Box>
  
  
  
          </Box>
        </Box>
      </>
    );
  };

export default AddPlatform;