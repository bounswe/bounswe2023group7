import React from 'react';
import TrendingGamesSlider from '../components/TrendingGamesSlider';
import Game1 from "../assets/witcher3.jpg";
import Game2 from "../assets/sims4.png";
import Game3 from "../assets/Tekken5Cover.jpg";
import { Typography } from '@material-ui/core';


const Homepage = () => {
  // Replace this with your actual game data
  const games = [
    { title: 'The Witcher 3', image: Game1},
    { title: 'Sims 4', image: Game2 },
    { title: 'Tekken 5', image: Game3 },
    // Add more game objects as needed
  ];

  return (
    <div>
      {/* Other homepage content */}
      <Typography variant="h2" gutterBottom align="center" style={{
              fontSize: "25px",
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
            }}>
        Trending Games of the Day
      </Typography>
      <TrendingGamesSlider games={games} />
      {/* Other sections */}
    </div>
  );
};

export default Homepage;
