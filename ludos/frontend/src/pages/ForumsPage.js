import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForumsBackground from "../assets/forumBackground.png";
import { Typography, Button, TextField, Container } from "@mui/material";
import ForumTopic from "../components/ForumTopic";
import axios from "axios";

const ForumsPage = () => {
  const navigate = useNavigate();
  const [latestTopics, setLatestTopics] = useState([]);
  const handleButtonClickUnlogged = () => {
    navigate("/signup");
  };
  const getLatestTopics = async () => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/post?limit=3&order=DESC&orderByKey=createdAt`,
      );

      // Handle the response data and create a new formatted list
      const formattedTopics = response.data.items.map((topic) => ({
        title: topic.title,
        numOfReplies: topic.numOfReplies,
        userOpened: topic.user.username,
        whenOpened: new Date(topic.createdAt).toLocaleDateString(
          "en-US",
          options,
        ),
        forumTags: topic.tags,
        forumGame: topic.game.title,
        id: topic.id,
        userId: topic.user.id,
      }));
      console.log(formattedTopics);

      // Set the state with the formatted list
      setLatestTopics(formattedTopics);
    } catch (error) {
      console.error("Error fetching latest topics:", error);
    }
  };

  useEffect(() => {
    getLatestTopics();
  }, []);
  const handleButtonClickLogged = () => {
    navigate("/create-thread");
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUserLoggedIn(true);
    }
  }, []);

  /*
  const latestTopics = [
    {
      title: "Are League of Legends players smart?",
      numOfReplies: 10,
      userOpened: "ClementKachepa",
      whenOpened: "Nov 27, 2023, 2:23:01 PM",
      forumTags: ["League of Legends", "Question"],
      forumGame: "League of Legends",
    },
    {
      title: "How many houses do you have in Sims 3?",
      numOfReplies: 8,
      userOpened: "wannaPlayWithLife",
      whenOpened: "Nov 27, 2023, 1:25:01 PM",
      forumTags: ["Question", "Sims 3"],
      forumGame: "Sims 3",
    },
    {
      title: "I stuck on the mission 65, HELPP!!",
      numOfReplies: 16,
      userOpened: "GtaLoveeer",
      whenOpened: "Nov 27, 2023, 1:12:01 PM",
      forumTags: ["Gta 5", "Help Wanted"],
      forumGame: "GTA 5",
    },
    // Add more topics as needed...
  ];
*/
  const trendTopics = [
    {
      title: "OMG! New Character for Dota",
      numOfReplies: 150,
      userOpened: "loverGame",
      whenOpened: "Nov 25, 2023, 1:19:01 PM",
      forumTags: ["Dota", "New Character"],
      forumGame: "Dota",
      imgsrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oAlf6eD-4mrGrbTaWeg2Ec17AhQLgfuYBQ&usqp=CAU",
    },
    {
      title: "Tell your best memory of Minecraft",
      numOfReplies: 240,
      userOpened: "minemine",
      whenOpened: "Nov 20, 2023, 6:12:01 PM",
      forumTags: ["Minecraft", "Discussion"],
      forumGame: "Minecraft",
      imgsrc:
        "https://cdn-www.bluestacks.com/bs-images/54ea74e2f2d10d2ad3a957260f564bea.png",
    },
    {
      title: "Who is your favorite character in Witcher 3",
      numOfReplies: 167,
      userOpened: "witchPlay",
      whenOpened: "Nov 22, 2023, 8:12:01 PM",
      forumTags: ["Witcher 3", "Question"],
      forumGame: "Witcher 3",
      imgsrc:
        "https://assets-prd.ignimgs.com/2022/04/15/zuko-alone-1650039877625.jpg",
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
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              size="large"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }, // Set background color to white
                inputProps: { style: { color: "black" } }, // Set text color to black
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                backgroundColor: "#68A849",
                borderBottomRightRadius: "10px",
                borderTopRightRadius: "10px",
                height: "56px",
              }}
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      <Container
        style={{
          backgroundColor: "rgb(30,30,30,0.9)",
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
        {userLoggedIn ? (
          <Button
            variant="contained"
            type="regular"
            size="large"
            style={{ marginTop: "10px", backgroundColor: "rgb(254,8,8, 0.6)" }}
            sx={{ marginLeft: "10px" }}
            onClick={handleButtonClickLogged}
          >
            Create a Thread
          </Button>
        ) : (
          <Button
            variant="contained"
            type="regular"
            size="large"
            style={{ marginTop: "10px", backgroundColor: "rgb(254,8,8, 0.9)" }}
            sx={{ marginLeft: "10px" }}
            onClick={handleButtonClickUnlogged}
          >
            Create a Thread
          </Button>
        )}
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          maxWidth: "1152px",
          width: "100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(30,30,30,0.9)",
            width: "100%",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flex: "1",
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
            Trending
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
            backgroundColor: "rgb(30,30,30,0.9)",
            width: "100%",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flex: "1",
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
            Latest
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
