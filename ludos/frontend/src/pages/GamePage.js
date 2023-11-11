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

import { TabContext, TabList, TabPanel } from "@mui/lab/";

import ListObject from "../components/ListObject.js";
import PlatformRequirements from "../components/PlatformRequirements.js";
import Reviews from "../components/Reviews.js";
import DescriptionTab from "../components/DescriptionTab.js";

function GamePage(data) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuth(true);
    }
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
            {data.game.title}
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
            {data.game.tags.map((data1, index1) => (
              <Typography
                variant="caption"
                component="div"
                style={tagBox}
                key={index1}
              >
                {data1}
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
          <img src={data.game.coverLink} alt={data.game.title} />
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
              value={data.game.averageRating}
              precision={0.1}
              disabled={true}
            />
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {data.game.averageRating}/5
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
              {data.game.followers}
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
              {data.game.averageUserCompilationDuration}
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
              {data.game.releaseDate}
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
              {data.game.ageRestriction}
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
              {data.game.publisher}
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
              {data.game.developer}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} style={{ marginLeft: "1%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={bioBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {data.game.gameBio}
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
        <Grid>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ color: "orange", width: "10%" }}
                    label="Description"
                    value="1"
                  />
                  <Tab
                    style={{ color: "orange", width: "12%" }}
                    label="System Requirements"
                    value="2"
                  />
                  <Tab
                    style={{ color: "orange", width: "12%" }}
                    label="Predecessors"
                    value="3"
                  />
                  <Tab
                    style={{ color: "orange", width: "12%" }}
                    label="Successors"
                    value="4"
                  />
                  <Tab
                    style={{ color: "orange", width: "12%" }}
                    label="Characters"
                    value="5"
                  />
                  <Tab
                    style={{ color: "orange", width: "5%" }}
                    label="Areas"
                    value="6"
                  />
                  <Tab
                    style={{ color: "orange", width: "5%" }}
                    label="Packages"
                    value="7"
                  />
                  <Tab
                    style={{ color: "orange", width: "5%" }}
                    label="Items"
                    value="8"
                  />
                  <Tab
                    style={{ color: "orange", width: "2%" }}
                    label="Groups"
                    value="9"
                  />
                  <Tab
                    style={{ color: "orange", width: "2%" }}
                    label="Reviews"
                    value="10"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <DescriptionTab
                    story={data.game.gameStory}
                    guide={data.game.gameGuide}
                    trivia={data.game.trivia}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="2">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <PlatformRequirements
                    requirements={data.game.systemRequirements}
                    platforms={data.game.platforms}
                  />
                </Typography>
              </TabPanel>
              <TabPanel value="3">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.predecessors} />
                </Typography>
              </TabPanel>
              <TabPanel value="4">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.successors} />
                </Typography>
              </TabPanel>
              <TabPanel value="5">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.characters} />
                </Typography>
              </TabPanel>
              <TabPanel value="6">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.areas} />
                </Typography>
              </TabPanel>
              <TabPanel value="7">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.packages} />
                </Typography>
              </TabPanel>
              <TabPanel value="8">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.items} />
                </Typography>
              </TabPanel>
              <TabPanel value="9">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <ListObject data={data.game.groups} />
                </Typography>
              </TabPanel>
              <TabPanel value="10">
                <Typography style={{ fontSize: "15px", color: "white" }}>
                  <Reviews data={data.game.reviews} showButtons={auth} />
                </Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePage;
