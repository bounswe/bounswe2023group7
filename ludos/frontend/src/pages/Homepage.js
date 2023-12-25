import React, { useState, useEffect } from "react";
import TrendingGamesSlider from "../components/TrendingGamesSlider";
import Game1 from "../assets/witcher3.jpg";
import Game2 from "../assets/sims4.png";
import Game3 from "../assets/Tekken5Cover.jpg";
import { Typography, Container, Grid } from "@mui/material";
import ForumTopic from "../components/ForumTopic";
import GroupTopic from "../components/GroupTopic";
import axios from "axios";

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
};

const Homepage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [groups, setGroups] = useState([]);
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchTrendingTopics();
    fetchSuggestedGames();
    fetchTrendingGames();
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

  /*
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
*/

  const mockSuggestedGames = [
    {
      title: "Sims 3",
      coverLink:
        "https://upload.wikimedia.org/wikipedia/tr/6/6f/Sims3cover.jpg",
    },
    {
      title: "Undertale",
      coverLink:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/391540/capsule_616x353.jpg?t=1579096091",
    },
    {
      title: "Super Mario",
      coverLink:
        "https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png",
    },
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

  /*
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
*/
  //console.log("mock games", games);

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  const fetchTrendingGames = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/game?limit=3&order=DESC&orderByKey=followers`,
      );

      if (response.data) {
        const formattedGames = response.data.items.map((game) => ({
          title: game.title,
          image: game.coverLink,
          content: game.gameBio,
        }));
        setGames(formattedGames);
        console.log("formatted games", formattedGames);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const fetchSuggestedGames = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/user/suggested`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );
      let suggestedGamesData = response.data;

      // Check if there are more than 3 suggested games, then select 3 randomly
      if (suggestedGamesData.length > 3) {
        const shuffledGames = suggestedGamesData.sort(
          () => Math.random() - 0.5,
        );
        suggestedGamesData = shuffledGames.slice(0, 3);
      }

      // Update suggestedGames state with the selected 3 games
      setSuggestedGames(suggestedGamesData);
      console.log(suggestedGamesData);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchTrendingTopics = async () => {
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
        `http://${process.env.REACT_APP_API_URL}/post?limit=3&order=DESC&orderByKey=numberOfLikes`,
      );

      // Handle the response data and create a new formatted list
      const formattedTopics = response.data.items.map((topic) => ({
        title: topic.title,
        numOfReplies: topic.numOfReplies,
        userOpened: topic.user.username,
        imgsrc: topic.user.avatar,
        whenOpened: new Date(topic.createdAt).toLocaleDateString(
          "en-US",
          options,
        ),
        forumTags: topic.tags,
        forumGame: topic.game.title,
        id: topic.id,
        userId: topic.user.id,
        isUpcomingTitle:
          topic.upcomingTitle != null
            ? topic.upcomingTitle.isUpcomingTitle
            : false,
      }));
      console.log("Trending Topics: ", formattedTopics);

      // Set the state with the formatted list
      setTrendingTopics(formattedTopics);
    } catch (error) {
      console.error("Error fetching trending topics:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* Other homepage content */}
      {games.length > 0 ? (
        <TrendingGamesSlider games={games} />
      ) : (
        <div>Loading trending games...</div> // Placeholder for loading state
      )}
      {/* Suggested Games Grid */}
      <Grid
        style={{
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          style={{
            fontWeight: "bold",
            color: "white",
            fontFamily: "Trebuchet MS, sans-serif",
          }}
        >
          Suggested Games for You!
        </Typography>
        <Grid
          container
          justifyContent="center"
          style={{
            padding: "20px",
          }}
        >
          {suggestedGames && suggestedGames.length > 0
            ? suggestedGames.map((game, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={4}
                  md={4}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "10px",
                    textAlign: "center",
                    maxWidth: "25%",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`/game/${convertToSlug(game.title)}`}
                    style={{
                      textDecoration: "none",
                      maxWidth: "33.33%",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={game.coverLink}
                      alt={game.title}
                      style={{
                        maxWidth: "100%",
                        height: "150px",
                        marginBottom: "10px",
                      }}
                    />
                  </a>
                  <a
                    href={`/game/${convertToSlug(game.title)}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Typography variant="h6" style={{ color: "#fff" }}>
                      {game.title}
                    </Typography>
                  </a>
                </Grid>
              ))
            : mockSuggestedGames.map((game, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  key={index}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "10px",
                    textAlign: "center",
                    maxWidth: "25%",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`/game/${convertToSlug(game.title)}`}
                    style={{
                      textDecoration: "none",
                      maxWidth: "33.33%",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={game.coverLink}
                      alt={game.title}
                      style={{
                        maxWidth: "100%",
                        height: "150px",
                        marginBottom: "10px",
                      }}
                    />
                  </a>
                  <a
                    href={`/game/${convertToSlug(game.title)}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Typography variant="h6" style={{ color: "#fff" }}>
                      {game.title}
                    </Typography>
                  </a>
                </Grid>
              ))}
        </Grid>
      </Grid>
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
            {trendingTopics.map((topic, index) => (
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
