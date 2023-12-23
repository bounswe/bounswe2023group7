import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        color: "#fff",
        marginTop: "72px",
        padding: 4, // theme.spacing(4) equivalent
        textAlign: "center",
        [(theme) => theme.breakpoints.down("sm")]: {
          textAlign: "left",
        },
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={12} sm={12}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              maxWidth: 100,
              marginRight: 2, // theme.spacing(2) equivalent
            }}
          />
          <Typography variant="body1" sx={{ justifyContent: "center" }}>
            If you are a developer or e-sport player? Contact us at{" "}
            <a href="mailto:ludos@ludos.com.tr" style={{ color: "#fff" }}>
              ludos@ludos.com.tr
            </a>{" "}
            and we will change your user type!
            <br />
            You can contact us for your wishes, suggestions, and complaints.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Additional content for the right side of the footer */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
