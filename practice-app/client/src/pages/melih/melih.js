import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import SearchPage from './gameinfo';
import axios from "axios";

const Page1 = () => {
  const [gameStores, setGameStores] = useState([]);

  const handleGameStoresClick = async () => {
    console.log('handleGameStoresClick called');
    try {
      console.log("Button clicked");
      const response = await axios.get('http://localhost:8080/api/gameprices/stores');
      setGameStores(response);
      const newWindow = window.open();
      newWindow.document.write(`<pre>${JSON.stringify(response, null, 2)}</pre>`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyCartClick = async () => {
    console.log('handleMyCartClick called');
    try {
      console.log("Button clicked");
      const accessToken = localStorage.getItem("accessToken");
      const response = (await axios.get('http://localhost:8080/api/gameprices', {headers: {Authorization: accessToken}})).data;
      setGameStores(response);
      const newWindow = window.open();
      newWindow.document.write(`<pre>${JSON.stringify(response, null, 2)}</pre>`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div>
         
      </div>



      <Button
        variant="contained"
        component={SearchPage}
        to="/gameinfo"
        sx={{
          backgroundColor: '#424242',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Search Game
      </Button>


      <Button
        variant="contained"
        onClick={handleGameStoresClick}
        sx={{
          backgroundColor: '#1976d2',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Game Stores
      </Button>

      <Button
        variant="contained"
        onClick={handleMyCartClick}
        sx={{
          backgroundColor: '#8BC34A',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        My Cart
      </Button>
    </div>
  );
};

export default Page1;
