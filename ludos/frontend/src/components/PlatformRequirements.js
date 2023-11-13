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

      {/*(
        <>
          <Typography
            variant="h5"
            color="gray"
            align="left"
            style={headerStyle}
          >
            MINIMUM SYSTEM REQUIREMENTS
          </Typography>
          {data.requirements.minimum["Operating System"] && (
            <Typography
              variant="body1"
              color="white"
              align="center"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              {data.requirements.minimum["Operating System"]}
            </Typography>
          )}
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.minimum.Processor}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.minimum.Memory}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            DirectX {data.requirements.minimum.DirectX}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.minimum.Storage}
          </Typography>
          <Typography
            variant="h5"
            color="gray"
            align="left"
            style={headerStyle}
          >
            RECOMMENDED SYSTEM REQUIREMENTS
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.recommended["Operating System"]}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.recommended.Processor}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.recommended.Memory}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            DirectX {data.requirements.recommended.DirectX}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{ fontFamily: "Trebuchet MS, sans-serif" }}
          >
            {data.requirements.recommended.Storage}
          </Typography>
        </>
      )*/}
    </Grid>
  );
}

export default Description;
