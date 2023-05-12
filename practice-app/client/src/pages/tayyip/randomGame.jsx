import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./randomGame-style.css"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext'


function App() {
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const token = localStorage.getItem("accessToken");

  let navigate = useNavigate();
  useEffect(() => {
    if (!authState.status) {
      navigate('/signin')
    } 
  });


  async function handleSubmit() {
    setIsLoading(true);
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
    setIsLoading(false);
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
      <div className="button-container">
        <Button onClick={() => handleSubmit()}
          variant="contained"
          sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS", alignItems: "center" }}>Get Random Game</Button>
        <Button onClick={() => handleGetHistory()}
          variant="contained"
          component={Link}
          to="/random-game-history"
          sx={{ backgroundColor: '#424242', color: '#FFFFFF', minWidth: '200px', fontFamily: "Trebuchet MS", alignItems: "center" }}>Get History</Button>
      </div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '55vh',
        padding: '2rem',
        color: 'dark grey',
      }}>
        {isLoading ? (
          <div className="loading-animation">
            <CircularProgress />
          </div>
        ) : game.name ? (
          <div className="game-card">
            <img src={game.image} alt={game.name} />
            <div className="game-info">
              <h2>{game.name}</h2>
              <p>{game.short_description}</p>
            </div>
          </div>
        ) : (
          <div className="informative">
            <Typography variant="h6">
              Click the "Get Random Game" button to generate a random game.
            </Typography>
          </div>
        )}
      </Box>
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
