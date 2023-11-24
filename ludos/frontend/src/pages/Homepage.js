import React from 'react';
import TrendingGamesSlider from '../components/TrendingGamesSlider';
import Game1 from "../assets/witcher3.jpg";
import Game2 from "../assets/sims4.png";
import Game3 from "../assets/Tekken5Cover.jpg";
import { Typography , Container} from '@material-ui/core';


const Homepage = () => {
  // Replace this with your actual game data
  const games = [
    { title: 'The Witcher 3', image: Game1, content: "Embark on an epic adventure in Witcher 3, where every choice you make shapes your destiny. Immerse yourself in a rich, vast open world filled with monsters, mysteries, and morally complex decisions."},
    { title: 'Sims 4', image: Game2, content: "Dive into the captivating world of life simulation with Sims 4 – create, build, and explore endless possibilities! Get lost in the ultimate virtual reality where your imagination knows no bounds." },
    { title: 'Tekken 5', image: Game3, content: "Experience the thrill of the fight in Tekken 5! Engage in heart-pounding battles, master martial arts skills, and challenge opponents in this legendary fighting game. Are you ready to claim victory?" },
    // Add more game objects as needed
  ];

  return (
    <div style={{display:"flex", flexDirection: "column", gap: "48px"}}>
      {/* Other homepage content */}
      
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
            variant="h3"
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
            variant="h3"
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
