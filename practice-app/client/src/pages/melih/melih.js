import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from "axios";

const Page1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [gameStores, setGameStores] = useState([]);



  const handleGameStoresClick = async () => {
  console.log('handleGameStoresClick called');
  try {
    console.log("Button clicked");
    const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/api/gameprices/stores`);
    setGameStores(response);
    const newWindow = window.open();
    newWindow.document.title = "Game Stores";
    newWindow.document.write(
      `<title>Game Stores</title> <div style="display:flex; flex-wrap:wrap; gap:20px">
        ${response.data.map(store => `
          <div style="border: 1px solid gray; padding: 20px; border-radius: 10px; width: 300px;">
            <div style="font-weight: bold;">${store.storeName}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <img src="https://www.cheapshark.com/${store.images.logo}" alt="${store.storeName} Logo" style="height: 64px; width: 64px;">
              <img src="https://www.cheapshark.com/${store.images.banner}" alt="${store.storeName} Banner" style="height: 64px; width: 192px;">
            </div>
          </div>
        `).join('')}
      </div>`
    );
  } catch (error) {
    console.error(error);
  }
};

const handleMyCartClick = async () => {
  console.log('handleMyCartClick called');
  try {
    console.log("Button clicked");
    const accessToken = localStorage.getItem("accessToken");
    const response = (await axios.get(`http://${process.env.REACT_APP_API_URL}/api/gameprices`, {headers: {Authorization: accessToken}})).data;
    const cartData = response.map(item => {
      return {
        game_name: item.game_name,
        game_rating: item.game_rating,
        sale_price: item.sale_price,
        retail_price: item.retail_price,
        img_url: item.img_url,
      }
    });
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>My Cart</title>
          <style>
            body {
              font-family: 'Roboto', sans-serif;
              background-color: #f2f2f2;
            }
            h1 {
              text-align: center;
              color: #333333;
              margin-top: 30px;
            }
            table {
              margin: 0 auto;
              width: 80%;
              border-collapse: collapse;
              background-color: #ffffff;
              box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
            }
            th, td {
              text-align: left;
              padding: 8px;
              border-bottom: 1px solid #dddddd;
            }
            th {
              background-color: #4CAF50;
              color: white;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            img {
              display: block;
              margin: auto;
              max-width: 100%;
              max-height: 90px;
              height: auto;
            }
          </style>
        </head>
        <body>
          <h1>My Cart</h1>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Rating</th>
                <th>Sale Price</th>
                <th>Retail Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              ${cartData.map(item => `
                <tr>
                  <td>${item.game_name}</td>
                  <td>${item.game_rating}</td>
                  <td>${item.sale_price}</td>
                  <td>${item.retail_price}</td>
                  <td><img src="${item.img_url}" alt="${item.game_name}"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
  }
};



  const addToCartClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
        const response = (await axios.post(`http://${process.env.REACT_APP_API_URL}/api/gameprices/add-cart`, {name : searchResult.game_name} ,{headers: {Authorization: accessToken}}));
        window.alert("Game is in your cart now!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");  
      const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/api/gameprices/game?name=${searchTerm}`, {headers: {"Authorization": accessToken}});
      console.log(response.data);
      setSearchResult(response.data);
      console.log(searchResult);
    } catch (error) {
      console.error(error);
      window.alert("Game is not found! Please enter a proper game name.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div>
         
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} style={{ padding: '8px', borderRadius: '8px', border: 'none', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)', width: '400px' }} />
        <button onClick={handleSearch} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#1976d2', color: '#FFFFFF', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)', cursor: 'pointer' }}>Search</button>
      </div>
      {searchResult && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <img src={searchResult.img_url} alt={searchResult.game_name} style={{ maxWidth: '400px' }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontWeight: 'bold' }}>Game Name:</div>
            <div>{searchResult.game_name}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontWeight: 'bold' }}>Game Rating:</div>
            <div>{searchResult.game_rating}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontWeight: 'bold' }}>Sale Price:</div>
            <div>{searchResult.sale_price}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontWeight: 'bold' }}>Retail Price:</div>
            <div>{searchResult.retail_price}</div>
          </div>
        </div>
      )}
    </div>  
      <Button
        variant="contained"
        onClick={addToCartClick}
        sx={{
          backgroundColor: '#5006dd',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Add to Cart
      </Button>

      

      <Button
        variant="contained"
        onClick={handleMyCartClick}
        sx={{
          backgroundColor: '#1976d2',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        My Cart
      </Button>

      

      <Button
        variant="contained"
        onClick={handleGameStoresClick}
        sx={{
          backgroundColor: '#1906d2',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Game Stores
      </Button>
    </div>
  );
};

export default Page1;
