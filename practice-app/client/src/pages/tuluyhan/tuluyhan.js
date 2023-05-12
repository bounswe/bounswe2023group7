import React, { useState } from 'react';
import axios from 'axios';

function StreamingGames() {
  const [mostViewedGame, setMostViewedGame] = useState({});
  const [savedGames, setSavedGames] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const TWITCH_API_CLIENT_ID = 'wbmzp6h6688riuedz47eezgn1fktgr';
  const TWITCH_API_TOKEN = 'x6c56s3fpxfgmfzfw144i34297li2k';

  const handleGetMostViewedGame = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/streaming-games/most-viewed`, {
        headers: {
          'Client-ID': TWITCH_API_CLIENT_ID,
          'Authorization': `Bearer ${TWITCH_API_TOKEN}`
        }
      });

      setMostViewedGame(response.data);
      setResponseMessage(`Most viewed game retrieved successfully: ${response.data.name} - ${response.data.id}`);
    } catch (error) {
      console.error(error);
      setResponseMessage(`Error retrieving most viewed game: ${error.message}`);
    }
  };

  const handleSaveMostViewedGame = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/streaming-games/most-viewed`, null, {
        headers: {
          'Client-ID': TWITCH_API_CLIENT_ID,
          'Authorization': `Bearer ${TWITCH_API_TOKEN}`
        }
      });

      setSavedGames([...savedGames, response.data]);
      setResponseMessage(`Most viewed game saved successfully: ${response.data.name} - ${response.data.id}`);
    } catch (error) {
      console.error(error);
      setResponseMessage(`Error saving most viewed game: ${error.message}`);
    }
  };

  const handleGetSavedGames = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/streaming-games/history-most-viewed`);

      setSavedGames(response.data);
      setResponseMessage(`Saved games retrieved successfully.`);
    } catch (error) {
      console.error(error);
      setResponseMessage(`Error retrieving saved games: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleGetMostViewedGame}>Get Most Viewed Game</button>

      <button onClick={handleSaveMostViewedGame}>Save Most Viewed Game</button>

      <button onClick={handleGetSavedGames}>Get Saved Games</button>

      {responseMessage && <p>{responseMessage}</p>}

      {mostViewedGame.name && (
        <div>
          <h2>Most Viewed Game</h2>
          <p>Name: {mostViewedGame.name}</p>
          <p>ID: {mostViewedGame.id}</p>
        </div>
      )}

      {savedGames.length > 0 && (
        <div>
          <h2>Saved Games</h2>
          <ul>
            {savedGames.map(game => (
              <li key={game._id}>
                <p>Name: {game.name}</p>
                <p>ID: {game.id}</p>
                <p>Date: {game.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StreamingGames;
