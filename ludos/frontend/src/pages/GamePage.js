import React, { useEffect, useState, useRef } from "react";
import { Recogito } from "@recogito/recogito-js";
import "@recogito/recogito-js/dist/recogito.min.css";
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
import GameForum from "../components/GameForums.js";
import { useNavigate } from "react-router-dom";
import { FaIgloo } from "react-icons/fa";

function GamePage(id) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [game, setGame] = useState(false);
  const [follow, setFollow] = useState(false);
  const [rate, setRate] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [submission, setSubmission] = useState(0);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuth(true);
    }
    const link = `http://${process.env.REACT_APP_API_URL}/game/${id.gameId}`;

    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setGame(response.data);
        setFollow(response.data.isFollowed);
        setRate(response.data.userRating);
        setAverageRating(response.data.averageRating);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [submission]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDuration = (event) => {
    const link = `http://${process.env.REACT_APP_API_URL}/game/${id.gameId}`;
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const formData = { duration: parseInt(duration) };
        console.log(response);
        if (response.data.userCompilationDuration) {
          const followLink = `http://${process.env.REACT_APP_API_URL}/game/completionDuration/${id.gameId}`;
          axios
            .put(followLink, formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            })
            .then(() => {
              setSubmission(submission + 1);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const followLink = `http://${process.env.REACT_APP_API_URL}/game/completionDuration/${id.gameId}`;
          console.log(event.target.value);
          axios
            .post(followLink, formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            })
            .then(() => {
              setSubmission(submission + 1);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
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
    backgroundColor: "rgb(125, 165, 0)",
    color: "rgb(0, 0, 0)",
    height: "20px",
    width: "8%",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
  };
  const unFollowButton = {
    backgroundColor: "rgb(222, 49, 99)",
    color: "rgb(255, 255, 255)",
    height: "20px",
    width: "8%",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
  };
  const editGame = {
    backgroundColor: "rgb(125, 165, 0)",
    color: "rgb(255, 255, 255)",
    height: "20px",
    width: "100%",
    marginLeft: "0%",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
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

  const gameBioAnnotatorRef = useRef(null);

  useEffect(() => {
    if (game && game.gameBio) {
      gameBioAnnotatorRef.current = new Recogito({
        content: "game-bio",
        // Other initialization...
      });

      fetchAnnotations();
      gameBioAnnotatorRef.current.on(
        "createAnnotation",
        handleCreateAnnotation,
      );

      return () => gameBioAnnotatorRef.current.destroy();
    }
  }, [game]);

  const handleCreateAnnotation = async (annotation) => {
    // Prepare your API request body
    const requestBody = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value, // You might need to format this according to your backend expectations
      target: {
        source: window.location.href,
        selector: {
          start: annotation.target.selector[1].start, // Starting character index
          end: annotation.target.selector[1].end, // Ending character index
        },
      },
    };

    // Make the API call to your server
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API_URL}/annotation/gamebio/${id.gameId}`,
        requestBody,
      );
      console.log("Annotation saved:", response.data);
    } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };

  // ... existing useEffect code for other functionalities

  // Function to fetch annotations
  const fetchAnnotations = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/annotation/gamebio/${id.gameId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );

      if (response.data) {
        displayGameBioAnnotations(response.data);
      }
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const displayGameBioAnnotations = (gameBioAnnotations) => {
    if (gameBioAnnotatorRef.current) {
      gameBioAnnotations.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        gameBioAnnotatorRef.current.addAnnotation({
          "@context": "http://www.w3.org/ns/anno.jsonld",
          type: "Annotation",
          id: annotation.id,
          body: [
            {
              type: "TextualBody",
              value: annotation.body,
              purpose: "commenting",
            },
          ],
          target: {
            selector: [
              {
                type: "TextQuoteSelector",
                exact: annotation.body,
              },
              {
                type: "TextPositionSelector",
                start: annotation.target.selector.start,
                end: annotation.target.selector.end,
              },
            ],
          },
        });
      });
    }
  };

  const handleFollowClick = () => {
    const followLink = `http://${process.env.REACT_APP_API_URL}/game/follow/${id.gameId}`;
    axios
      .put(
        followLink,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      )
      .then(() => {
        setFollow(true);
        console.log(follow);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUnFollowClick = () => {
    const followLink = `http://${process.env.REACT_APP_API_URL}/game/unfollow/${id.gameId}`;
    axios
      .put(
        followLink,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      )
      .then(() => {
        setFollow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRateClick = (event) => {
    const link = `http://${process.env.REACT_APP_API_URL}/game/${id.gameId}`;
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const formData = { rating: parseInt(event.target.value) };
        console.log(event.target.value);
        if (response.data.userRating !== null) {
          const followLink = `http://${process.env.REACT_APP_API_URL}/rating/${id.gameId}`;
          axios
            .put(followLink, formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            })
            .then(() => {
              setRate(event.target.value);
              console.log("yee");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const followLink = `http://${process.env.REACT_APP_API_URL}/rating/${id.gameId}`;
          console.log(event.target.value);
          axios
            .post(followLink, formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            })
            .then(() => {
              setRate(event.target.value);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditGameClick = () => {
    if (auth) {
      // If the user is logged in, redirect to the create game page
      navigate("/create-game", { state: game });
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/signup");
    }
  };
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
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "3.5%",
            }}
          >
            <Button
              variant="contained"
              style={editGame}
              onClick={handleEditGameClick}
            >
              Edit Game
            </Button>
          </Grid>
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
            {auth && follow && (
              <Button
                variant="contained"
                style={unFollowButton}
                onClick={handleUnFollowClick}
              >
                Unfollow
              </Button>
            )}
            {auth && !follow && (
              <Button
                variant="contained"
                style={followButton}
                onClick={handleFollowClick}
              >
                Follow
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} style={imageBoxStyle}>
          <img
            src={game.coverLink}
            alt={game.title}
            style={{ height: 350, width: 250 }}
          />
        </Grid>
        <Grid item xs={6} sm={2} md={2} lg={2} style={{ marginLeft: "2%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Rate:
            </Typography>
            <Rating
              name="game-rating"
              value={rate}
              precision={1}
              onClick={handleRateClick}
            />
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
              value={averageRating}
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
              {game.averageCompletionDuration}
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
              component="div"
              id="game-bio"
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
                <TextField
                  id="outlined-basic"
                  style={inputStyle}
                  onChange={handleChangeDuration}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                style={submitStyle}
                onClick={handleDuration}
              >
                <Button
                  style={{
                    color: "black",
                    textTransform: "none",
                    fontFamily: "Trebuchet MS, sans-serif",
                  }}
                >
                  Submit Your Duration
                </Button>
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
                    label="Available Platforms"
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
                <Typography
                  style={{
                    fontSize: "15px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <RelatedGames
                    predecessors={game.predecessors}
                    successors={game.successors}
                    gameId={game.id}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="4">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <EntityTab gameId={game.id} auth={auth} />
                </Typography>
              </TabPanel>
              <TabPanel value="5">
                <Typography
                  style={{ fontSize: "15px", color: "white" }}
                ></Typography>
              </TabPanel>
              <TabPanel value="6">
                <Reviews data={[]} id={game.id} showButtons={auth} />
              </TabPanel>
              <TabPanel value="7">
                <GameForum id={game.id} showButtons={auth} />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePage;
