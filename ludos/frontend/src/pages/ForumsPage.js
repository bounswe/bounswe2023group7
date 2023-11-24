import React from "react";
import { Link } from 'react-router-dom';
import ForumsBackground from "../assets/forumBackground.png";
import { Typography, Button, TextField, Container } from "@mui/material";
import ForumTopic from "../components/ForumTopic";

const ForumsPage = () => {
  const latestTopics = [
    {
      title: "Are League of Legends players smart?",
      numOfReplies: 10,
      userOpened: "@ClementKachepa",
      whenOpened: "2 hours ago",
      forumTags: ["question", "leagueOfLegends"],
      forumGame: "League of Legends",
    },
    {
      title: "How many houses do you have in Sims 3?",
      numOfReplies: 8,
      userOpened: "@wannaPlayWithLife",
      whenOpened: "4 hours ago",
      forumTags: ["question", "Sims3"],
      forumGame: "Sims 3",
    },
    {
      title: "I stuck on the mission 65, HELPP!!",
      numOfReplies: 16,
      userOpened: "@GtaLoveeer",
      whenOpened: "10 hours ago",
      forumTags: ["help", "GTA5"],
      forumGame: "GTA 5",
    },
    // Add more topics as needed...
  ];

  const trendTopics = [
    {
      title: "OMG! New Character for Dota",
      numOfReplies: 150,
      userOpened: "@loverGame",
      whenOpened: "2 days ago",
      forumTags: ["New Feature", "Dota"],
      forumGame: "Dota",
    },
    {
      title: "Tell your best memory of Minecraft",
      numOfReplies: 240,
      userOpened: "@minemine",
      whenOpened: "1 week ago",
      forumTags: ["Curious", "Minecraft"],
      forumGame: "Minecraft",
    },
    {
      title: "Who is your favorite character in Witcher 3",
      numOfReplies: 167,
      userOpened: "@witchPlay",
      whenOpened: "5 days ago",
      forumTags: ["favorites", "Witcher3"],
      forumGame: "Witcher 3",
    },
    // Add more topics as needed...
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gap: "48px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxWidth: "960px",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
        }}
      >
        <img
          src={ForumsBackground}
          style={{ width: "100%", height: "auto" }}
          alt="Background"
        />
        <div
          style={{
            position: "absolute" /* Set position to absolute */,
            top: "50%" /* Position vertically in the middle */,
            left: "50%" /* Position horizontally in the middle */,
            transform: "translate(-50%, -180%)" /* Center the content */,
            textAlign: "center",
            width: "80%" /* Adjust width as needed */,
          }}
        >
          <Typography
            style={{
              fontSize: "92px",
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bolder",
            }}
          >
            The Ludos Forum
          </Typography>
        </div>
        <div
          style={{
            position: "absolute" /* Set position to absolute */,
            top: "50%" /* Position vertically in the middle */,
            left: "50%" /* Position horizontally in the middle */,
            transform: "translate(-50%, 200%)" /* Center the content */,
            textAlign: "center",
            width: "80%" /* Adjust width as needed */,
          }}
        >
          <form
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center" /* Align items horizontally */,
              justifyContent: "center" /* Center items horizontally */,
              width: "600px" /* Enlarged search bar width */,
              margin: "0 auto" /* Center the form */,
              gap: "16px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              size="large"
              InputProps={{
                style: { backgroundColor: "white" }, // Set background color to white
                inputProps: { style: { color: "black" } }, // Set text color to black
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              style={{ marginTop: "10px" }}
              sx={{ backgroundColor: "#68A849", marginLeft: "10px" }}
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      <Container
          style={{
            backgroundColor: "#68A849",
            maxWidth: "960px",
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
            Join the discussion! Create your forum thread now.
          </Typography>
          <Link to="/create-thread" style={{ textDecoration: 'none' }}>
          <Button
              variant="contained"
              type="regular"
              size="large"
              style={{ marginTop: "10px", backgroundColor: "#9c27b0" }}
              sx={{ marginLeft: "10px" }}
            >
              Create a Thread
            </Button>
            </Link>
        </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          maxWidth: "960px",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(200,200,200,0.6)",
            width: "456px",
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
            {trendTopics.map((topic, index) => (
              <ForumTopic key={index} topic={topic} />
            ))}
          </div>
        </Container>
        <Container
          style={{
            backgroundColor: "rgb(200,200,200,0.6)",
            width: "456px",
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
            Latest Topics
          </Typography>
          {/* Render your forum topics below */}
          {/* Replace this section with your actual forum topics */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              {latestTopics.map((topic, index) => (
                <ForumTopic key={index} topic={topic} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ForumsPage;
