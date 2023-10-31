import React from "react";
import {
  
  Typography,
  Grid,
  
} from "@mui/material";

function ListObject (description) {

  return (
    <Grid style={{width:"100%"}}>
      {description.data.map((game, index1) => (
              <Typography
                variant="caption"
                component="div"
                key={index1}
              >
                {game}
              </Typography>
            ))}
    </Grid>
    );
}

export default ListObject;