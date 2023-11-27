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
  console.log(data);
  return (
    <Grid style={{ width: "100%" }}>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        PLATFORMS
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
        {data.platforms &&
          data.platforms.map((platform, index1) => (
            <Typography
              variant="body1"
              color="white"
              align="center"
              style={{
                fontFamily: "Trebuchet MS, sans-serif",
              }}
              key={index1}
            >
              {platform}
            </Typography>
          ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        MINIMUM SYSTEM REQUIREMENTS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Operating System: {data?.requirements?.minimum?.OS}
      </Typography>

      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        CPU: {data?.requirements?.minimum?.CPU}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        GPU: {data?.requirements?.minimum?.GPU}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Memory: {data?.requirements?.minimum?.RAM}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        DirectX: {data?.requirements?.minimum?.DirectX}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Storage: {data?.requirements?.minimum?.Storage}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Network: {data?.requirements?.minimum?.Network}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        RECOMMENDED SYSTEM REQUIREMENTS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Operating System: {data?.requirements?.recommended?.OS}
      </Typography>

      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        CPU: {data?.requirements?.recommended?.CPU}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        GPU: {data?.requirements?.recommended?.GPU}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Memory: {data?.requirements?.recommended?.RAM}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        DirectX: {data?.requirements?.recommended?.DirectX}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Storage: {data?.requirements?.recommended?.Storage}
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="center"
        style={{ fontFamily: "Trebuchet MS, sans-serif" }}
      >
        Network: {data?.requirements?.recommended?.Network}
      </Typography>
    </Grid>
  );
}

export default Description;
