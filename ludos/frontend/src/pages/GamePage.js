import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  Tab,
  TextField,
} from "@mui/material";
import axios from "axios";

import { TabContext, TabList, TabPanel } from "@mui/lab/";

import PlatformRequirements from "../components/PlatformRequirements.js";
import Reviews from "../components/Reviews.js";
import DescriptionTab from "../components/DescriptionTab.js";
import RelatedGames from "../components/RelatedGamesTab.js";
import EntityTab from "../components/EntityTab.js";

function GamePage(id) {
  const [auth, setAuth] = useState(false);
  const [game, setGame] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuth(true);
    }
    console.log(id);
    const link = `http://${process.env.REACT_APP_API_URL}/game/${id.gameId}`;

    axios
      .get(link, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const imageBoxStyle = {
    height: "auto",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginLeft: "2%",
    marginBottom: "2%",
  };

  const smallBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "rgb(0, 150, 255)",
    borderRadius: "15px",
    width: "auto",
    height: "20%",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    padding: "10px", // Add padding to give some space between the content and the border
  };

  const bioBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "rgb(0, 150, 255)",
    borderRadius: "15px",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "66%",
    marginTop: "10px",
    padding: "10px",
  };
  const inputBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "rgb(0, 150, 255)",
    borderRadius: "15px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: "10px",
    marginRight: "5px",
    padding: "10px",
  };

  const submitStyle = {
    backgroundColor: "rgb(255, 165, 0)",
    borderRadius: "10px",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    marginTop: "14px",
    padding: "10px",
    color: "black",
  };

  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };
  const inputStyle = {
    backgroundColor: "rgba(255, 250, 255, 0.6)",
    borderRadius: "5px",
    width: "50%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  };

  useEffect(() => {}, []);

  return (
    <Container
      style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
    >
      <Grid container spacing={1} style={boxStyle}>
        <Box p={0} style={{ width: "100%", marginTop: "3%" }}>
          <Typography
            style={{
              fontSize: "25px",
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            {game.title}
          </Typography>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "3%",
            }}
          >
            {game.tags &&
              game.tags.map((tag, index1) => (
                <Typography
                  variant="caption"
                  component="div"
                  style={tagBox}
                  key={index1}
                >
                  {tag}
                </Typography>
              ))}
            {auth && (
              <Button variant="contained" style={followButton}>
                Follow
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} style={imageBoxStyle}>
          <img src={game.coverLink} alt={game.title} />
        </Grid>
        <Grid item xs={6} sm={2} md={2} lg={2} style={{ marginLeft: "2%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Rate:
            </Typography>
            <Rating name="game-rating" value={0} precision={1} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Ludos Rate:
            </Typography>
            <Rating
              name="user-rating"
              value={game.averageRating}
              precision={0.1}
              disabled={true}
            />
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.averageRating}/5
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Followers:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.followers}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Average Duration:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.averageUserCompilationDuration}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={2} md={2} lg={2} style={{ marginLeft: "1%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Release Date:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.releaseDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Age Restriction:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.ageRestriction}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Publisher:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.publisher}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Developer:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.developer}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} style={{ marginLeft: "1%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={bioBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {game.gameBio}
            </Typography>
          </Grid>
          {auth && (
            <Grid style={{ display: "flex", height: "20%" }}>
              <Grid item xs={12} sm={8} md={8} lg={8} style={inputBoxStyle}>
                <Typography
                  component="caption"
                  style={{
                    fontSize: "15px",
                    fontFamily: "Trebuchet MS, sans-serif",
                  }}
                >
                  Share Your Duration
                </Typography>
                <TextField id="outlined-basic" style={inputStyle} />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} style={submitStyle}>
                <Button>Submit</Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid sx={{ width: "100%" }}>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{
                      color: "orange",
                      width: "14%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Description"
                    value="1"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "15%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="System Requirements"
                    value="2"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "15%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Related Games"
                    value="3"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "14%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Entities"
                    value="4"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "14%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Groups"
                    value="5"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "14%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Reviews"
                    value="6"
                  />
                  <Tab
                    style={{
                      color: "orange",
                      width: "14%",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    label="Forum"
                    value="7"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <DescriptionTab
                    story={game.gameStory}
                    guide={game.gameGuide}
                    trivia={game.trivia}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="2">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <PlatformRequirements
                    requirements={game.systemRequirements}
                    platforms={game.platforms}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="3">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <RelatedGames
                    predecessors={game.predecessors}
                    successors={game.successors}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="4">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <EntityTab
                    characters={game.characters}
                    areas={game.areas}
                    items={game.items}
                    packages={game.packages}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="5">
                <Typography
                  style={{ fontSize: "15px", color: "white" }}
                ></Typography>
              </TabPanel>
              <TabPanel value="6">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <Reviews data={game.reviews} showButtons={auth} />
                </Typography>
              </TabPanel>
              <TabPanel value="7">
                <Typography
                  style={{ fontSize: "15px", color: "white" }}
                ></Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePage;
