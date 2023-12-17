import React, { useState } from "react";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TrendingGamesSlider from "../components/TrendingGamesSlider";
import GameCard from "../components/GameCard";
import TrendingGames from "../components/TrendingGames";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

// Mock data for TrendingGames
const trendingGames = [
  {
    name: "EA FC24",
    imageUrl:
      "https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/f33dc5483be5538172f6e326dc2a4266/32/256x256.png",
  },
  {
    name: "Spiderman 2",
    imageUrl:
      "https://sm.ign.com/t/ign_nordic/cover/m/marvels-sp/marvels-spider-man-2_fx3k.128.jpg",
  },
  {
    name: "Resident Evil 4 Remake",
    imageUrl:
      "https://www.techpowerup.com/review/resident-evil-4-remake-dlss-and-xess-community-patch/images/small.png",
  },
  {
    name: "Starfield",
    imageUrl:
      "https://www.techpowerup.com/review/starfield-fsr-2-2/images/small.png",
  },
  {
    name: "Diablo VI",
    imageUrl:
      "https://b.thumbs.redditmedia.com/AgOjcpx7M7ji4yw0KORj1831_yY8kODhBL6wdxK8WJE.png",
  },
  {
    name: "Valorant",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1271880138507145216/jEx4bMW0_400x400.png",
  },
  {
    name: "Call of Duty: Modern Warfare 3",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e965704-45d5-4545-a786-8281bc7fc34a/d49wyde-803bbc73-2696-4d42-8fba-623273051caf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJlOTY1NzA0LTQ1ZDUtNDU0NS1hNzg2LTgyODFiYzdmYzM0YVwvZDQ5d3lkZS04MDNiYmM3My0yNjk2LTRkNDItOGZiYS02MjMyNzMwNTFjYWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QR0J8DKc5mYXpnXgMSLM3paX78wgc37Lv9_VCoCAn74",
  },
  {
    name: "Grand Theft Auto V",
    imageUrl:
      "https://i.pinimg.com/474x/d3/18/e8/d318e8b67185dd89c801153f19480ea9.jpg",
  },
  {
    name: "Lost Ark",
    imageUrl:
      "https://styles.redditmedia.com/t5_5uyabk/styles/communityIcon_7jlrtwb7y3i81.png",
  },
  {
    name: "Mount & Blade II: Bannerlord",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8efd62b4-05ec-4237-9336-abae8a8801fb/ddu05dr-1216baa8-bcb0-4401-8da0-b03a99718b87.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhlZmQ2MmI0LTA1ZWMtNDIzNy05MzM2LWFiYWU4YTg4MDFmYlwvZGR1MDVkci0xMjE2YmFhOC1iY2IwLTQ0MDEtOGRhMC1iMDNhOTk3MThiODcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5zIK3XDBGnQeWicltw-QG8nybs0AvOG5w3Wr9Zh7V-M",
  },
];

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
}

export default function GamesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [games, setGames] = useState([]);
  const [suggestedGames, setSuggestedGames] = useState([]);


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

      <TrendingGamesSlider games={gameHighlight} />
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
            handleGameRoute(newValue);
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
              color: "white",
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
            backgroundColor: "rgb(255, 255, 255, 0.6)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
          sm={4}
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
            Trending Games
          </Typography>
          {/* Render your forum topics below */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              <TrendingGames games={trendingGames} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
