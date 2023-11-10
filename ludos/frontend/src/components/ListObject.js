import React from "react";
import { Typography, Grid } from "@mui/material";

function ListObject(description) {
  return (
    <Grid style={{ width: "100%" }}>
      {description.data.map((info, index1) => (
        <Typography variant="caption" component="div" key={index1}>
          {info}
        </Typography>
      ))}
    </Grid>
  );
}

export default ListObject;
