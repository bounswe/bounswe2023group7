import React from "react";
import { Typography, Grid } from "@mui/material";

function Description(data) {
  const headerStyle = {
    marginBottom: "8px",
    marginTop: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
  };
  return (
    <Grid style={{ width: "100%" }}>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        CHARACTERS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.characters.map((character, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {character}
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        ITEMS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.items.map((item, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {item}
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        AREAS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.areas.map((area, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {area}
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        PACKAGES
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.packages.map((dlc, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {dlc}
          </Typography>
        ))}
      </Typography>
    </Grid>
  );
}

export default Description;
