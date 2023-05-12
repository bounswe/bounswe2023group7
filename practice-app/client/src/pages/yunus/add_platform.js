import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const SubmitPlatform = () => {
  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    try {
      if (localStorage.getItem("accessToken")) {

        const response = await axios.post('http://localhost:8080/api/game-platform/platform?title=' + keyword,{} ,{
          headers: {
           "Authorization": localStorage.getItem("accessToken"),
          },
        });
        if (response.status==200) {
          setMessage('Submission successful');
          setOpen(true);
        } else {
          setMessage('Submission failed');
          setOpen(true);
        }
      }
    } catch (error) {
      setMessage('An error occurred');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography
            variant="h4"
            component="p"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Trebuchet MS',
            }}
          >
            SUBMIT THE PLATFORM
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{
                label: { color: 'white', fontFamily: 'Trebuchet MS' },
              }}
              id="outlined-basic"
              label="Give Your Keyword"
              variant="outlined"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#424242',
                color: '#FFFFFF',
                minWidth: '200px',
                fontFamily: 'Trebuchet MS',
              }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} />
    </>
  );
};

export default SubmitPlatform;