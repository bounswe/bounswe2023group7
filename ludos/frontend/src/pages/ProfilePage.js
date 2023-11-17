import { Avatar, Container, Grid, Typography, Box } from "@mui/material";
import React from "react";
import steamLogo from "../assets/steam.png";
import epicLogo from "../assets/epic.png";
import itchioLogo from "../assets/itchio.png";

function ProfilePage() {
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
    height: "320px",
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
  const avatarStyle = { width: 250, height: 250, marginLeft: "4%" };

  return (
    <Container
      style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
    >
      <Grid container spacing={1} style={boxStyle}>
        <Grid item xs={12} sm={3} md={3} lg={3} style={{ marginLeft: "3%" }}>
          <Avatar alt="Empty Profile Photo" style={avatarStyle} />
          <Typography
            component="legend"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
              color: "rgb(0, 150, 255)",
              marginTop: "2%",
            }}
          >
            @cemreBey
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} style={{ marginLeft: "1%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              İsim:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Cemre Beydirel
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={smallBoxStyle}>
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
          sm={4}
          md={4}
          lg={2}
          style={{ marginLeft: "1%" }}
        ></Grid>
        <Grid
          item
          xs={6}
          sm={2}
          md={2}
          lg={2}
          style={{ marginLeft: "1%", displayContent: "right" }}
        >
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
    </Container>
  );
}

export default ProfilePage;
