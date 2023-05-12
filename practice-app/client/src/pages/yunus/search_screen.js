import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

function SearchForm() {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

  const handleSubmit = async () => {
    const link = `http://${process.env.REACT_APP_API_URL}/api/game-platform/search?title=`+inputValue;
    const response = await axios.get(link, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    const sendObject={state: response.data};
    navigate("/game-platform/list_searched", sendObject);
  };

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
              SEARCH THE GAME
            </Typography>
          
            <Box
    sx={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '1rem',
    }}
  >
      <TextField onChange={handleInputChange} value={inputValue} sx={{ label: { color: 'white',fontFamily: "Trebuchet MS"} }} id="outlined-basic" label="Give Your Keyword" variant="outlined" />
      <Button onClick={handleSubmit} 
      variant="contained"
      component={Link}
      sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS"}}>Send</Button>
  </Box>
  
  
  
          </Box>
        </Box>
      </>
    
  );
}

export default SearchForm;
