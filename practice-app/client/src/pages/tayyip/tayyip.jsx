import React, { useState } from "react";
import axios from "axios";
import "./tayyip-style.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import History from "./randomGameHistory.jsx";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im10ayIsImlhdCI6MTY4MzczMzE3N30.CijpcqEFWUs-5DrKe01WefwSOulYnWfn3qP22UU2XXw";

function App() {
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);

  async function handleSubmit() {
    try {
      const result = await axios.post('http://localhost:8080/api/random-game',
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      setGame(result.data);
    } catch (error) {
      console.error(error);
    }
  };


  async function handleGetHistory() {
    try {
      const result = await axios.get("http://localhost:8080/api/random-game/history", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setGames(result.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '55vh',
        padding: '2rem',
        color: 'dark grey',
      }}>
        {game.name && (
          <div className="game-card">
            <img src={game.image} alt={game.name} />
            <div className="game-info">
              <h2>{game.name}</h2>
              <p>{game.short_description}</p>
            </div>
          </div>
        )}
      </Box>
      <div className="button-container">
        <Button onClick={() => handleSubmit()}
          variant="contained"
          component={Link}
          sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS", alignItems: "center" }}>Get Random Game</Button>
        <Button onClick={() => handleGetHistory()}
          variant="contained"
          component={Link}
          to="/random-game-history"
          sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS", alignItems: "center" }}>Get History</Button>
      </div>
      {games.map((game) => (
        <div className="game-card-container">
          <div className="game-card" key={game.id}>
            <img src={game.headerImage} alt={game.name} />
            <div className="game-info">
              <h2>Name: {game.name}</h2>
              <p>Short Description: {game.shortDescription}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
