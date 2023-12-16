import React, { useEffect, useState } from "react";
import TrendingGamesSlider from "../components/TrendingGamesSlider";
import Game1 from "../assets/witcher3.jpg";
import Game2 from "../assets/sims4.png";
import Game3 from "../assets/Tekken5Cover.jpg";
import { Typography, Container } from "@mui/material";
import ForumTopic from "../components/ForumTopic";
import GroupTopic from "../components/GroupTopic";
import axios from "axios";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/group?limit=3&page=1&order=DESC&orderByKey=maxNumberOfMembers`;
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setGroups(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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

  const groupTopics = [
    {
      title: "GameZone Guild",
      numOfMembers: 150,
      userOpened: "@loverGame",
      whenOpened: "Nov 25, 2023, 1:21:01 PM",
      groupTags: ["Fantasy", "Adventure"],
      groupGame: "Dota",
    },
    {
      title: "Gamer's Assembly",
      numOfMembers: 240,
      userOpened: "@minemine",
      whenOpened: "Nov 20, 2023, 6:12:01 PM",
      groupTags: ["Action", "Adventure"],
      groupGame: "Minecraft",
    },
    {
      title: "RPG Masters Society",
      numOfMembers: 167,
      userOpened: "@witchPlay",
      whenOpened: "Nov 22, 2023, 8:12:01 PM",
      groupTags: ["RPG"],
      groupGame: "Witcher 3",
    },
    // Add more topics as needed...
  ];

  // Replace this with your actual game data
  const games = [
    {
      title: "The Witcher 3",
      image: Game1,
      content:
        "Embark on an epic adventure in Witcher 3, where every choice you make shapes your destiny. Immerse yourself in a rich, vast open world filled with monsters, mysteries, and morally complex decisions.",
    },
    {
      title: "Sims 4",
      image: Game2,
      content:
        "Dive into the captivating world of life simulation with Sims 4 – create, build, and explore endless possibilities! Get lost in the ultimate virtual reality where your imagination knows no bounds.",
    },
    {
      title: "Tekken 5",
      image: Game3,
      content:
        "Experience the thrill of the fight in Tekken 5! Engage in heart-pounding battles, master martial arts skills, and challenge opponents in this legendary fighting game. Are you ready to claim victory?",
    },
    // Add more game objects as needed
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* Other homepage content */}

      <TrendingGamesSlider games={games} />
      {/* Other sections */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1152px",
          width: "100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(30, 30, 30, 0.9)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
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
            backgroundColor: "rgb(30, 30, 30, 0.9)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
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
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              {groups.map((topic, index) => (
                <GroupTopic key={index} topic={topic} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Homepage;
