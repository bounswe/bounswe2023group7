import React from "react";
import { Typography, Grid } from "@mui/material";

function Description(data) {
  const headerStyle = {
    marginBottom: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
  };
  console.log(data);
  return (
    <Grid style={{ width: "100%" }}>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        STORY
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.story}
      </Typography>

      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        GUIDE
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.guide}
      </Typography>

      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        TRIVIA
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.trivia}
      </Typography>
    </Grid>
  );
}

export default Description;
