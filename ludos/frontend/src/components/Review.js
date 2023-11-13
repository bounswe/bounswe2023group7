import React from "react";
import { Grid, Box, Typography, Button, Rating } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Review(data, index1) {
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };

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
            {data.review.username}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
          >
            {data.review.timestamp}
          </Typography>
          <Rating
            name="game-rating"
            value={data.review.rating}
            disabled={true}
            precision={1}
          />
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="left"
          style={descriptionStyle}
        >
          {data.review.reviewText}
        </Typography>
        <Grid
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {data.showButton && (
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
  );
}

export default Review;
