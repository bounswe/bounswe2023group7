import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import steamLogo from "../assets/steam.png";
import epicLogo from "../assets/epic.png";
import itchioLogo from "../assets/itchio.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    steamUrl: "",
    aboutMe: "",
  });
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitInformation = () => {
    console.log(formData);
    const link = `http://${process.env.REACT_APP_API_URL}/user/edit-info`;

    axios
      .put(
        link,
        {
          fullName: formData.fullName,
          steamUrl: formData.steamUrl,
          aboutMe: formData.aboutMe,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const openSteamTab = () => {
    window.open(
      "https://steamcommunity.com/profiles/76561199020341351/",
      "_blank",
    );
  };

  const editProfile = () => {};

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "rgba(255,170,0, 0.8)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    borderRadius: "5%",
  };

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
              <Button onClick={editProfile} style={{ minWidth: 0 }}>
                <Avatar alt="Empty Profile Photo" style={avatarStyle} />
              </Button>

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
                <Button onClick={openSteamTab} style={{ minWidth: 0 }}>
                  <img
                    src={steamLogo}
                    style={{ height: 30, width: 30 }}
                    alt="Steam"
                  />
                </Button>
                <Button style={{ minWidth: 0 }}>
                  <img
                    src={epicLogo}
                    style={{ height: 30, width: 30 }}
                    alt="Epic"
                  />
                </Button>
                <Button style={{ minWidth: 0 }}>
                  <img
                    src={itchioLogo}
                    style={{ height: 30, width: 30 }}
                    alt="Itch.io"
                  />
                </Button>
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
                  {profile.fullName || "Yunus Emre"}
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
                  {profile.aboutMe ||
                    "A university student who is interested in strategy games."}
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
                  Number of Posts
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
                      backgroundColor: "rgb(0, 150, 255)",
                      textTransform: "none",
                      color: "white",
                      fontFamily: "Trebuchet MS, sans-serif",
                      width: "100%",
                      marginTop: "4%",
                    }}
                    onClick={handleOpen}
                  >
                    Edit My Profile
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Grid style={modalStyle}>
                      <Typography
                        component="legend"
                        style={{
                          fontFamily: "Trebuchet MS, sans-serif",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                      >
                        Full Name
                      </Typography>
                      <TextField
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                      />
                      <Typography
                        component="legend"
                        style={{
                          fontFamily: "Trebuchet MS, sans-serif",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                      >
                        Steam ID:
                      </Typography>
                      <TextField
                        id="steamUrl"
                        value={formData.steamUrl}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                      />
                      <Typography
                        component="legend"
                        style={{
                          fontFamily: "Trebuchet MS, sans-serif",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                      >
                        Bio:
                      </Typography>
                      <TextField
                        id="aboutMe"
                        value={formData.aboutMe}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          marginTop: "2%",
                          marginLeft: "5%",
                          marginRight: "5%",
                        }}
                        multiline
                        maxRows={4}
                      />
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(0, 150, 255)",
                          textTransform: "none",
                          color: "white",
                          fontFamily: "Trebuchet MS, sans-serif",
                          width: "40%",
                          marginTop: "4%",
                          marginLeft: "55%",
                          marginBottom: "4%",
                        }}
                        onClick={submitInformation}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Modal>
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
              <Grid
                key={index1}
                style={{
                  marginLeft: "5%",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  height: 240,
                  width: 180,
                  borderRadius: "5%",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    width: 150,
                    borderRadius: "50%",
                    marginTop: "5%",
                  }}
                  onClick={() => {}}
                  alt={game.title}
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
