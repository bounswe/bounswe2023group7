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
        PREDECCESORS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.predecessors.map((predecessor, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {predecessor}
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        SUCCCESORS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {data.successors.map((successor, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            {successor}
          </Typography>
        ))}
      </Typography>
    </Grid>
  );
}

export default Description;
