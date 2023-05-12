import React, { useState } from "react";
import axios from "axios";

import "./style.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [mostViewedGame, setMostViewedGame] = useState({});
  const [savedGames, setSavedGames] = useState([]);

  const handleGetMostViewedGame = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/api/streaming-games/most-viewed");

      setMostViewedGame(response.data);
      setResponseMessage("");
    } catch (error) {
      setMostViewedGame({});
      setResponseMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleSaveMostViewedGame = async () => {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8080/api/streaming-games/most-viewed", mostViewedGame);

      setResponseMessage("Most viewed game saved successfully!");
    } catch (error) {
      setResponseMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleGetSavedGames = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/api/streaming-games/history-most-viewed");

      setSavedGames(response.data);
      setResponseMessage("");
    } catch (error) {
      setSavedGames([]);
      setResponseMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="buttons-container">
        <button 
          className="button" 
          onClick={handleGetMostViewedGame}
        >
          Get Most Viewed Game
        </button>
  
        <button 
          className="button" 
          onClick={handleSaveMostViewedGame}
        >
          Save Most Viewed Game
        </button>
  
        <button 
          className="button" 
          onClick={handleGetSavedGames}
        >
          Get Saved Games
        </button>
      </div>
  
      {responseMessage && <p className="response-message">{responseMessage}</p>}
  
      <div className="game-info-container">
        {mostViewedGame.name && (
          <div className="game-info">
            <h2>Most Viewed Game</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="saved-game-item">
                <p>Name: {mostViewedGame.name}</p>
                <p>ID: {mostViewedGame.id}</p>
              </div>
            </div>
          </div>
        )}
  
        {savedGames.length > 0 && (
          <div className="saved-games">
            <h2>Saved Games</h2>
            <div className="saved-games-list">
              {savedGames.map(game => (
                <div className="saved-game-item" key={game._id}>
                  <p>Name: {game.name}</p>
                  <p>ID: {game.id}</p>
                  <p>Date: {game.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
