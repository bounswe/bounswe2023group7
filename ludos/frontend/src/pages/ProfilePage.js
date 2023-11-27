import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Input,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import steamLogo from "../assets/steam.png";
//import epicLogo from "../assets/epic.png";
//import itchioLogo from "../assets/itchio.png";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

function ProfilePage() {
  const convertToSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };
  let { username } = useParams();
  console.log(username);
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
  const [avatarImage, setAvatarImage] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        const link = `http://${process.env.REACT_APP_API_URL}/external/upload`;
        axios
          .post(link, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const link2 = `http://${process.env.REACT_APP_API_URL}/user/edit-info`;
            axios
              .put(
                link2,
                {
                  avatar: response.data.url,
                },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("accessToken"),
                  },
                },
              )
              .then(() => {
                setAvatarImage(response.data.url);
                setSnackbarMessage("Image uploaded successfully!");
                setSnackbar(true);
              })
              .catch((error) => {
                console.log(error);
                setSnackbarMessage("Image could not be uploaded!");
                setSnackbar(true);
              });

            // Now you can update the profile or perform any other action with the response data
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            setSnackbarMessage("Image could not be uploaded!");
            setSnackbar(true);
          });

        // Now you can update the profile or perform any other action with the response data
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

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
          console.log(response.data);
          if (response.data.id === username || username === undefined) {
            setMyProfile(true);
            setProfile(response.data);
            setAvatarImage(response.data.avatar);
            setFormData({
              fullName: response.data.fullName,
              steamUrl: response.data.steamUrl,
              aboutMe: response.data.aboutMe,
            });
            if (response.data.followedGames.length > 10) {
              setFavGames(response.data.followedGames.slice(0, 10));
            } else {
              setFavGames(response.data.followedGames);
            }
            console.log(favGames);
            console.log(response.data);
          } else {
            const link1 = `http://${process.env.REACT_APP_API_URL}/user/byId/${username}`;

            axios
              .get(link1, {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              })
              .then((response1) => {
                setProfile(response1.data);
                setAvatarImage(response1.data.avatar);
                setFormData({
                  fullName: response1.data.fullName,
                  steamUrl: response1.data.steamUrl,
                  aboutMe: response1.data.aboutMe,
                });
                if (response1.data.followedGames.length > 10) {
                  setFavGames(response1.data.followedGames.slice(0, 10));
                } else {
                  setFavGames(response1.data.followedGames);
                }
              })
              .catch((error) => {
                console.log(error);
                navigate("/");
              });
          }
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
  const closeSnackbar = () => {
    setSnackbarMessage("");
    setSnackbar(false);
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
      .then(() => {
        setSnackbarMessage("Information updated successfully!");
        setSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage("Information could not be updated!");
        setSnackbar(true);
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
    console.log(formData.steamUrl);
    if (formData.steamUrl !== "" && formData.steamUrl !== null) {
      window.open(
        `https://steamcommunity.com/profiles/${formData.steamUrl}`,
        "_blank",
      );
    }
  };

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

  const gameTitleStyle = { color: "rgb(255, 255, 255)", marginRight: "2%" };

  const gameBoxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
    height: "auto",
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

  const avatarStyle = {
    width: 250,
    height: 250,
    marginLeft: "4%",
    borderRadius: "50%",
  };

  return (
    <>
      {auth && myProfile ? (
        <Container
          style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
        >
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            message={snackbarMessage}
          />
          <Grid container spacing={1} style={boxStyle}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              style={{ marginLeft: "3%" }}
            >
              <Input
                type="file"
                accept="image/*"
                id="upload-avatar"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-avatar">
                <Button component="span" style={{ minWidth: 0 }}>
                  {avatarImage ? (
                    <img src={avatarImage} style={avatarStyle} alt="Profile" />
                  ) : (
                    <img
                      src={
                        "https://p7.hiclipart.com/preview/173/464/909/clip-art-pokeball-png.jpg"
                      }
                      alt="Empty Profile Photo"
                      style={avatarStyle}
                    />
                  )}
                </Button>
              </label>
              <Grid
                style={{
                  marginTop: "3%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                    marginTop: "2%",
                    marginLeft: "30%",
                  }}
                >
                  @{profile.username}
                </Typography>
                <Button>
                  <NotificationsIcon
                    style={{ color: "red" }}
                    className="notification-icon"
                  />
                </Button>
              </Grid>

              <Grid style={{ marginTop: "3%" }}>
                <Button onClick={openSteamTab} style={{ minWidth: 0 }}>
                  <img
                    src={steamLogo}
                    style={{ height: 30, width: 30 }}
                    alt="Steam"
                  />
                </Button>
                {/*<Button style={{ minWidth: 0 }}>
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
                </Button>*/}
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
                  {formData.fullName}
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
                  {formData.aboutMe}
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
                  {profile.reviews?.length}
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
                  {profile.posts?.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={statBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Number of Favorite Games:
                </Typography>
                <Typography
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  {profile.followedGames?.length}
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
            <Grid id="favGamesSection" item xs={12} sm={12} md={12} lg={12}>
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
                  height: "auto",
                  width: 220,
                  borderRadius: "5%",
                  marginTop: "2%",
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
                  <Link
                    to={`http://localhost:3000/game/${convertToSlug(
                      game.title,
                    )}`}
                    style={gameTitleStyle}
                  >
                    {game.title}
                  </Link>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
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
              {avatarImage ? (
                <img src={avatarImage} style={avatarStyle} alt="Profile" />
              ) : (
                <img
                  src={
                    "https://p7.hiclipart.com/preview/173/464/909/clip-art-pokeball-png.jpg"
                  }
                  alt="Empty Profile Photo"
                  style={avatarStyle}
                />
              )}

              <Grid
                style={{
                  marginTop: "3%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="legend"
                  style={{
                    fontFamily: "Trebuchet MS, sans-serif",
                    color: "rgb(0, 150, 255)",
                    marginTop: "2%",
                    marginLeft: "30%",
                  }}
                >
                  @{profile.username}
                </Typography>
                <Button>
                  <NotificationsIcon
                    style={{ color: "red" }}
                    className="notification-icon"
                  />
                </Button>
              </Grid>

              <Grid style={{ marginTop: "3%" }}>
                <Button onClick={openSteamTab} style={{ minWidth: 0 }}>
                  <img
                    src={steamLogo}
                    style={{ height: 30, width: 30 }}
                    alt="Steam"
                  />
                </Button>
                {/*<Button style={{ minWidth: 0 }}>
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
                </Button>*/}
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
                  {formData.fullName}
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
                  {formData.aboutMe}
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
                  {profile.reviews?.length}
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
                  {profile.posts?.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={statBoxStyle}>
                <Typography
                  component="legend"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  Number of Favorite Games:
                </Typography>
                <Typography
                  component="div"
                  style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                >
                  {profile.followedGames?.length}
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
                ></Grid>
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
      )}
    </>
  );
}

export default ProfilePage;
