import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import Review from "./Review";

function Reviews(reviews) {
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };

  const userStyle = { color: "rgb(0, 250, 255)", marginRight: "2%" };

  return (
    <Grid>
      {reviews.data.map((review, index1) => (
        <Review review={review} key={index1} showButton={reviews.showButtons} />
      ))}
      {reviews.showButtons && (
        <Box p={5} style={boxStyle}>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
          >
            Share Your Review
          </Typography>
          <TextField
            id="multiline-input"
            multiline
            rows={4}
            variant="outlined" // You can choose the variant you prefer
            fullWidth
            InputProps={{
              style: { color: "white" }, // Apply custom styles to the input element
            }}
          />
          <Grid style={{ display: "flex", justifyContent: "right" }}>
            <Button variant="contained" style={{ marginTop: "3%" }}>
              Enter
            </Button>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default Reviews;
