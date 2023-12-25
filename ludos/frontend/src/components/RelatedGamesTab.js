import React, { useEffect } from "react";
import { Typography, Grid, Box, Link } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import GameCard from "./GameCard";

function Description(data) {
  const [suggestedGames, setSuggestedGames] = useState([]);

  const convertToSlug = (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  useEffect(() => {
    axiosInstance.get(`/game/${data.gameId}/related`).then((response) => {
      setSuggestedGames(response.data.slice(0, 5));
      console.log(response.data);
    });
  }, []);

  const headerStyle = {
    marginBottom: "8px",
    marginTop: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
  };

  return (
    <Grid
      container
      xs={8}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" color="gray" align="left" style={headerStyle}>
          PREDECCESORS
        </Typography>
        <Typography
          variant="body1"
          color="white"
          align="left"
          style={{
            marginBottom: "8px",
            fontFamily: "Trebuchet MS, sans-serif",
          }}
        >
          {data.predecessors.map((predecessor, index1) => (
            <Link to={`/game/${convertToSlug(predecessor)}`} key={index1}>
              <Typography
                variant="body1"
                color="white"
                align="center"
                style={{
                  fontFamily: "Trebuchet MS, sans-serif",
                }}
              >
                {predecessor}
              </Typography>
            </Link>
          ))}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" color="gray" align="left" style={headerStyle}>
          SUCCCESORS
        </Typography>
        <Typography
          variant="body1"
          color="white"
          align="left"
          style={{
            marginBottom: "8px",
            fontFamily: "Trebuchet MS, sans-serif",
          }}
        >
          {data.successors.map((successor, index1) => (
            <Typography
              variant="body1"
              color="white"
              align="center"
              style={{
                fontFamily: "Trebuchet MS, sans-serif",
              }}
              key={index1}
            >
              {successor}
            </Typography>
          ))}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Box xs={4}>
          <Typography
            variant="h5"
            color="gray"
            align="left"
            style={headerStyle}
          >
            SUGGESTED GAMES
          </Typography>
          {suggestedGames.map((game, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <GameCard game={game} />
            </div>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Description;
