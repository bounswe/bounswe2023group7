import React from "react";
import { Grid, Box, Typography, Button, TextField, Rating } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function ListObject(reviews) {
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };
  console.log(reviews);
  const userStyle = { color: "rgb(0, 250, 255)", marginRight: "2%" };

  const descriptionStyle = { color: "white" };

  const upVoteButton = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    marginRight: "5px",
    height: "auto",
  };
  const downVoteButton = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    marginRight: "5px",
    display: "flex",
    height: "auto",
  };

  return (
    <Grid>
      {reviews.data.map((review, index1) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          key={index1}
          style={{ marginBottom: "1%" }}
        >
          <Box p={5} style={boxStyle}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "left",
                marginBottom: "10px",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                textAlign="left"
                style={userStyle}
              >
                {review.username}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                textAlign="left"
                style={userStyle}
              >
                {review.timestamp}
              </Typography>
              <Rating name="game-rating" value={review.rating} disabled={true} precision={1} />
            </Grid>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="left"
              style={descriptionStyle}
            >
              {review.reviewText}
            </Typography>
            <Grid
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              {reviews.showButtons && (
                <>
                  <Button variant="contained" style={upVoteButton}>
                    <FaThumbsUp style={{ color: "rgb(124, 252, 0)" }} />
                  </Button>
                  <Button variant="contained" style={downVoteButton}>
                    <FaThumbsDown style={{ color: "rgb(222, 49, 99)" }} />
                  </Button>
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      ))}
      { reviews.showButtons && <Box p={5} style={boxStyle}>
        <Typography
          variant="caption"
          component="div"
          textAlign="left"
          style={userStyle}
        >Share Your Review</Typography>
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
        <Grid style={{display:"flex", justifyContent:"right"}}>
        <Button variant="contained" style={{marginTop:"3%"}}>
          Enter
                  </Button>
        </Grid>
      </Box>}
      

      
    </Grid>
  );
}

export default ListObject;
