import { React, useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Grid, Box } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
};

export default function GameCard({ game }) {
  const [gameTitle, setGameTitle] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (title) => {
    setGameTitle(convertToSlug(title));
    console.log(gameTitle);
    navigate(`/game/${convertToSlug(title)}`);
    window.location.reload(false);
  };

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const replaceImage = (error) => {
    error.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Video-Game-Controller-Icon-D-Edit.svg/2048px-Video-Game-Controller-Icon-D-Edit.svg.png";
  };

  return (
    <Card
      xs={6}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "20px",
        backgroundColor: "#171738",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
          }}
        >
          <Box
            onClick={() => handleCardClick(game.title)}
            sx={{
              backgroundColor: "#B4CDED",
              padding: "10px 100px",
              borderRadius: "20px",
              cursor: "pointer", // İmleci işaretçiye dönüştürür
              "&:hover": {
                backgroundColor: "#A1C4E4", // Hover durumunda arka plan rengi
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              style={{
                fontWeight: "bold",
              }}
            >
              {game.title}
            </Typography>
            <Typography
              style={{
                fontStyle: "italic",
              }}
            >
              {game.developer}
            </Typography>
            <Typography variant="body2">
              Release Date: {formatDate(game.releaseDate)}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            flexGrow: 1,
          }}
        >
          <Box sx={{ marginRight: "16px", borderRadius: "20px" }}>
            <img
              src={game.coverLink}
              alt={game.title}
              style={{ height: 150, width: 150, borderRadius: "20px" }}
              onError={replaceImage}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#7180B9",
              padding: "20px",
              borderRadius: "30px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ color: "white", width: "100%" }}>
              {game.gameBio.slice(0, 300)}...
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {game?.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                style={{
                  marginRight: "4px",
                  backgroundColor: "#F75C03",
                  fontWeight: "bold",
                }}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
