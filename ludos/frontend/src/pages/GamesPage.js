import React, { useState } from "react";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TrendingGamesSlider from "../components/TrendingGamesSlider";
import GameCard from "../components/GameCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForumTopic from "../components/ForumTopic";
/*
const gameHighlight = [
  {
    title: "Baldur's Gate 3",
    image:
      "https://www.technopat.net/sosyal/eklenti/1692017243090-png.1902461/",
    content:
      "Embark on an epic adventure in Witcher 3, where every choice you make shapes your destiny. Immerse yourself in a rich, vast open world filled with monsters, mysteries, and morally complex decisions.",
  },
  {
    title: "Undertale",
    image: "https://cdn.wannart.com/production/post/2018/12/Undertale-1.png",
    content:
      "Welcome to UNDERTALE. In this RPG, you control a human who falls underground into the world of monsters. Now you must find your way out... or stay trapped forever.",
  },
  {
    title: "Football Manager 2024",
    image:
      "https://cdn1.epicgames.com/offer/610a546d4e204215a0b9a1c8a382bacb/EGS_FootballManager2024_SportsInteractive_S2_1200x1600-d59e8b3545615cbc8a51d8acd316dd60",
    content:
      "Take on the role of a football manager in Football Manager 2024, where every decision you make shapes the destiny of your team. Immerse yourself in the world of football, filled with tactics, transfers, and morally complex choices as you strive for victory on the pitch.",
  },
];
*/

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
};

export default function GamesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [games, setGames] = useState([]);
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [upcomingTitles, setUpcomingTitles] = useState([]);
  const [gameHighlight, setGameHighlight] = useState([]);

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  const navigate = useNavigate();

  const handleGameRoute = (value) => {
    navigate(`/game/${convertToSlug(value)}`);
  };

  useEffect(() => {
    fetchTrendingGames();

    axiosInstance
      .get(`/user/suggested`)
      .then((response) => {
        setSuggestedGames(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        setGameHighlight(formattedGames);
        console.log("formatted games", formattedGames);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    axiosInstance
      .get(
        "/post?isLiked=false&isDisliked=false&isUpcomingTitle=true&order=ASC&orderByKey=numberOfLikes",
      )
      .then((response) => {
        const formattedTopics = response.data.items.map((topic) => ({
          title: topic?.title,
          numOfReplies: topic?.numOfReplies,
          userOpened: topic?.user.username,
          imgsrc: topic?.user.avatar,
          whenOpened: new Date(topic?.createdAt).toLocaleDateString(
            "en-US",
            options,
          ),
          forumTags: topic?.tags,
          forumGame: topic?.game.title,
          id: topic?.id,
          userId: topic?.user.id,
          isUpcomingTitle:
            topic?.upcomingTitle != null
              ? topic?.upcomingTitle?.isUpcomingTitle
              : false,
        }));
        console.log("formattedTopics:");
        console.log(formattedTopics);
        setUpcomingTitles(formattedTopics);
        console.log("upcomingTitles:");
        console.log(upcomingTitles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      axiosInstance
        .get(`/game?searchKey=${searchKey}`)
        .then((response) => {
          console.log(response);
          setGames(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (searchKey) {
      fetchGames();
    }
  }, [searchKey]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Other homepage content */}
      <div
        style={{
          backgroundColor: "#71dfcf",
          backgroundImage: `url(https://images8.alphacoders.com/131/1314784.png)`,
          backgroundSize: "cover",
          textAlign: "center",
          display: "flex",
          width: "70%" /* Adjust width as needed */,
          flexDirection: "column",
          alignSelf: "center",
          borderRadius: "40px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            fontFamily: "Trebuchet MS, sans-serif",
            fontWeight: "bold",
            fontSize: "75px",
          }}
        >
          Games
        </Typography>
      </div>

      {gameHighlight.length > 0 ? (
        <TrendingGamesSlider games={gameHighlight} />
      ) : (
        <div>Loading trending games...</div> // Placeholder for loading state
      )}
      {/* Other sections */}
      <div
        style={{
          backgroundColor: "rgb(231, 158, 74)",
          textAlign: "center",
          width: "75%" /* Adjust width as needed */,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          borderRadius: "40px",
          backgroundImage: `url(https://i.pinimg.com/736x/02/ba/86/02ba867e545f953631148c89629412b1.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "white",
            fontFamily: "Trebuchet MS, sans-serif",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Search Games
        </Typography>
        <Autocomplete
          value={searchValue}
          onChange={(event, newValue) => {
            setSearchValue(newValue);
            if (newValue) {
              handleGameRoute(newValue);
            }
          }}
          options={games.map((game) => game.title)}
          onInputChange={(event, newInputValue) => {
            setSearchKey(newInputValue);
          }}
          required
          renderInput={(params) => (
            <TextField
              {...params}
              width="90%"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",

                  legend: {
                    marginLeft: "30px",
                  },
                },
                "& .MuiAutocomplete-inputRoot": {
                  paddingLeft: "20px !important",
                  borderRadius: "50px",
                },
                "& .MuiInputLabel-outlined": {
                  paddingLeft: "20px",
                },
                "& .MuiInputLabel-shrink": {
                  marginLeft: "20px",
                  paddingLeft: "10px",
                  paddingRight: 0,
                  background: "white",
                },
              }}
            />
          )}
          style={{
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "40px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1152px",
          width: "100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
          alignItems: "flex-start",
          marginBottom: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.6)",
            flex: "2",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
          sm={8}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{
              color: "black",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Suggested Games
          </Typography>
          <div
            style={{ gap: "16px", display: "flex", flexDirection: "column" }}
          >
            {suggestedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </Container>
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.3)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
          }}
          sm={4}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{
              color: "black",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Upcoming Titles
          </Typography>
          {/* Render your forum topics below */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              {upcomingTitles.map((topic, index) => {
                return <ForumTopic key={index} topic={topic} />;
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
