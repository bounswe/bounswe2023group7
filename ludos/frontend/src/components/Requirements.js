import React from "react";
import {
  
  Typography,
  Grid,
  
} from "@mui/material";

function Description (description) {
  console.log(description);

  return (
    <Grid style={{width:"100%"}}>
      <Typography variant="body1" color="white" align="center">Minimum Requirements</Typography>
    <Grid>
    <Typography variant="body1" color="white" align="center"> {description.data.minimum["Operating System"]}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.minimum.Processor}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.minimum.Memory}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.minimum.DirectX}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.minimum.Storage}</Typography>
    </Grid>
    <Typography variant="body1" color="white" align="center">Recommended Requirements</Typography>
    <Grid>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended["Requires a 64-bit processor and operating system"]}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended["Operating System"]}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended.Processor}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended.Memory}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended.DirectX}</Typography>
    <Typography variant="body1" color="white" align="center"> {description.data.recommended.Storage}</Typography>
    </Grid>
    </Grid>
    );
}

export default Description;