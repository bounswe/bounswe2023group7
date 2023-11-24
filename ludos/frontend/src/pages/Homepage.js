import React from 'react';
import TrendingGamesSlider from '../components/TrendingGamesSlider';
import Game1 from "../assets/witcher3.jpg";
import Game2 from "../assets/sims4.png";
import Game3 from "../assets/Tekken5Cover.jpg";
import { Typography , Container} from '@material-ui/core';


const Homepage = () => {
  // Replace this with your actual game data
  const games = [
    { title: 'The Witcher 3', image: Game1},
    { title: 'Sims 4', image: Game2 },
    { title: 'Tekken 5', image: Game3 },
    // Add more game objects as needed
  ];

  return (
    <div style={{display:"flex", flexDirection: "column"}}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1152px",
          width:"100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.6)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Trend Topics
          </Typography>
          {/* Render your forum topics below */}
          {/* Replace this section with your actual forum topics */}
          <div
            style={{ gap: "16px", display: "flex", flexDirection: "column" }}
          >
            Content
          </div>
        </Container>
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.6)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
          Join a Group!
          </Typography>
          {/* Render your forum topics below */}
          {/* Replace this section with your actual forum topics */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "center" }}
            >
             Content
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Homepage;
