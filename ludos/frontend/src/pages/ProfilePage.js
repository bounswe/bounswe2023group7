import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import steamLogo from "../assets/steam.png";
import epicLogo from "../assets/epic.png";
import itchioLogo from "../assets/itchio.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState("");
  const [favGames, setFavGames] = useState([]);
  useEffect(() => {
    setAuth(false);
    if (localStorage.getItem("accessToken")) {
      setAuth(true);

      const link = `http://${process.env.REACT_APP_API_URL}/user/info`;

      axios
        .get(link, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setProfile(response.data);
          if (response.data.followedGames.length > 3) {
            setFavGames(response.data.followedGames.slice(0, 3));
          } else {
            setFavGames(response.data.followedGames);
          }
          console.log(favGames);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
    height: "400px",
  };

  const gameBoxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
    height: "300px",
    marginTop: "7px",
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
  const genreBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "rgb(0, 150, 255)",
    borderRadius: "15px",
    width: "auto",
    height: "73%",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    padding: "10px", // Add padding to give some space between the content and the border
  };
  const statBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "rgb(0, 150, 255)",
    borderRadius: "15px",
    width: "auto",
    height: "27%",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    padding: "10px", // Add padding to give some space between the content and the border
  };

  const avatarStyle = { width: 250, height: 250, marginLeft: "4%" };

  return (
    <>
      {auth ? (
        <Container
          style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
        >
          <Grid container spacing={1} style={boxStyle}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              style={{ marginLeft: "3%" }}
            >
              <Avatar alt="Empty Profile Photo" style={avatarStyle} />
              <Typography
                component="legend"
                style={{
                  fontFamily: "Trebuchet MS, sans-serif",
                  color: "rgb(0, 150, 255)",
                  marginTop: "2%",
                }}
              >
                @{profile.username}
              </Typography>
              <Grid style={{ marginTop: "3%" }}>
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                    marginRight: "2%",
                  }}
                  onClick={() => {}}
                  alt="Steam"
                  src={steamLogo}
                />
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                    marginRight: "2%",
                  }}
                  onClick={() => {}}
                  alt="Epic Games"
                  src={epicLogo}
                />
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                    marginRight: "2%",
                  }}
                  onClick={() => {}}
                  alt="Itch.io"
                  src={itchioLogo}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              style={{ marginLeft: "1%" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Full Name:
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Cemre Beydirel
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={bioBoxStyle}>
                <Typography
                  variant="caption"
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  A university student who is interested in strategy games.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2.5}
              md={2.5}
              lg={2.5}
              style={{ marginLeft: "1%", displayContent: "right" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} style={statBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Number of Reviews
                </Typography>
                <Typography
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  34
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={statBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Nnumber of Posts
                </Typography>
                <Typography
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  8
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={statBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Number of Comments:
                </Typography>
                <Typography
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  120
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2.5}
              md={2.5}
              lg={2.5}
              style={{ marginLeft: "1%" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: "3%",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(30, 30, 30, 0)",
                      textTransform: "none",
                      color: "green",
                      fontFamily: "Trebuchet MS, sans-serif",
                      width: "100%",
                      marginTop: "4%",
                    }}
                    onClick={() => {}}
                  >
                    Edit My Profile
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={genreBoxStyle}>
                <Typography
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  Favorite Genres:
                </Typography>
                <Typography
                  variant="caption"
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  Action
                </Typography>
                <Typography
                  variant="caption"
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  Hack-and-Slash
                </Typography>
                <Typography
                  variant="caption"
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  Sports
                </Typography>
                <Typography
                  variant="caption"
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                  }}
                >
                  FPS
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={gameBoxStyle}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                style={{
                  fontSize: "25px",
                  color: "white",
                  fontFamily: "Trebuchet MS, sans-serif",
                }}
              >
                Some Favorite Games of the User
              </Typography>
            </Grid>
            {favGames.map((game, index1) => (
              <Grid key={index1} style={{ marginLeft: "5%" }}>
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    width: 150,
                  }}
                  onClick={() => {}}
                  alt="Steam"
                  src={game.coverLink}
                />
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                  color="white"
                >
                  {game.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <>
          <Container
            style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
          >
            <Grid container spacing={1} style={boxStyle}></Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default ProfilePage;
