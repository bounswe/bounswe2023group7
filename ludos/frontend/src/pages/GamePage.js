import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Rating,
  Button,
} from "@mui/material";

function GamePage() {
  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0, 150, 255)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
  };

  const followButton = {
    backgroundColor: "rgb(255, 165, 0)",
    color: "rgb(0, 0, 0)",
    height: "20px",
    textTransform: "none",
  };

  const game = {
    title: "God of War (2018)",
    coverLink:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    averageRating: 4.8,
    userRating: 4,
    followers: 5000000,
    systemRequirements: {
      minimum: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor:
          "Intel i5-2500k (4 cores, 3.3 GHz) or AMD Ryzen 3 1200 (4 cores, 3.1 GHz)",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GTX 960 (4 GB) or AMD R9 290X (4 GB)",
        DirectX: "Version 11",
        Storage: "70 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
      recommended: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor:
          "Intel i5-6600k (4 cores, 3.5 GHz) or AMD Ryzen 5 2400 G (4 cores, 3.6 GHz)",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GTX 1060 (6 GB) or AMD RX 570 (4 GB)",
        DirectX: "Version 11",
        Storage: "70 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
    },
    userCompilationDuration: 45, // Adjusted to integer
    averageUserCompilationDuration: 45.5, // Adjusted to float
    predecessors: ["God of War III", "God of War (2005)"],
    successors: ["God of War Ragnarok"],
    gameGuide:
      "A comprehensive game guide featuring tips, strategies, and in-depth walkthroughs to assist players in navigating the game world and mastering its challenges.",
    gameStory:
      "An epic adventure set in Norse mythology, where Kratos and his son Atreus embark on a journey filled with action, exploration, and emotional depth.",
    platforms: ["PlayStation 4", "PlayStation 5"],
    ageRestriction: "Mature (17+)",
    characters: ["Kratos", "Atreus", "Freya", "Baldur"],
    areas: ["Midgard", "Alfheim", "Helheim"],
    packages: [
      "Standard Edition",
      "Collector's Edition",
      "Digital Deluxe Edition",
    ],
    items: ["Leviathan Axe", "Spartan Rage", "Talismans"],
    gameBio:
      "God of War is an action-adventure game that reimagines Kratos as he battles Norse gods and monsters.",
    groups: ["Aesir", "Vanir"],
    tags: ["Action", "Adventure", "Mythology", "Hack and Slash"],
    releaseDate: "April 20, 2018",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    trivia:
      "Did you know? The game's director, Cory Barlog, drew inspiration from his own experiences as a father to create the emotional father-son dynamic between Kratos and Atreus.",
  };

  const ratingStyle = {
    backgroundColor: "gray",
    borderRadius: "100px",
    width: "auto",
    height: "auto",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  };

  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };
  useEffect(() => {}, []);

  return (
    <Container style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" } }>
      <Grid container spacing={1} style={boxStyle}>
        <Box p={0} style={{ width: "100%", marginTop: "3%" }}>
          <Typography style={{ fontSize: "25px" }}>{game.title}</Typography>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "3%",
            }}
          >
            {game.tags.map((data1, index1) => (
              <Typography
                variant="caption"
                component="div"
                style={tagBox}
                key={index1}
              >
                {data1}
              </Typography>
            ))}
            <Button variant="contained" style={followButton}>
              Follow
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} style={{marginLeft:"2%"}}>
          <Box p={0} style={{ width: "100%" }}>
            <img src={game.coverLink} alt="God of War" />
          </Box>
        </Grid>
        <Grid item xs={6} sm={2} md={2} lg={2} style={{marginLeft:"2%"}}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Release Date:</Typography>
            <Typography component="legend">{game.releaseDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Rate:</Typography>
            <Rating name="game-rating" value={game.userRating} precision={1} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Rate:</Typography>
            <Rating
              name="user-rating"
              value={game.averageRating}
              precision={0.1}
              disabled="true"
            />
            <Typography component="legend">{game.averageRating}/5</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Followers:</Typography>
            <Typography component="legend">{game.followers}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Average Duration:</Typography>
            <Typography component="legend">
              {game.averageUserCompilationDuration}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} style={{marginLeft:"1%"}}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">{game.gameBio}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={2} md={2} lg={2} style={{marginLeft:"1%"}}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={ratingStyle}>
            <Typography component="legend">Platforms:</Typography>
            {game.platforms.map((data1, index1) => (
              <Typography variant="caption" component="div" key={index1}>
                {data1}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePage;
