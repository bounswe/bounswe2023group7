import "./tayyip-style.css"
import React, { useState } from "react";
import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im10ayIsImlhdCI6MTY4MzczMzE3N30.CijpcqEFWUs-5DrKe01WefwSOulYnWfn3qP22UU2XXw";

function App() {
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);

  async function handleSubmit() {
    try {
      const result = await axios.post('http://localhost:8080/api/random-game', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const { name, short_description, image, price } = result.data;
      setGame({ name, short_description, image, price });
    } catch (error){
      console.error(error);
    } 
  };
  

  async function handleGetHistory() {
    try {
      const result = await axios.get("http://localhost:8080/api/random-game", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setGames(result.data);
    } catch (error) {
      console.error(error);
    }    
  };

  return (
    <div className="App">
      <div className="game-card">
        <img src={game.headerImage} alt={game.name} />
        <div className="game-info">
          <h2>{game.name}</h2>
          <p>{game.shortDescription}</p>
          <p>{game.price}</p>
        </div>
      </div>
      <div className = "button-container">
        <button onClick={() => handleSubmit()}>Get Random Game</button>
        <button onClick={() => handleGetHistory()}>Get History</button>
      </div>
      {games.map((game) => (
        <div className="game-card" key={game.id}>
          <img src={game.headerImage} alt={game.name} />
          <div className="game-info">
            <h2>{game.name}</h2>
            <p>{game.shortDescription}</p>
            <p>{game.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
