import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, Rating } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";

function Review(data, index1) {
  const [user, setUser] = useState({ username: "" });
  const link = `http://${process.env.REACT_APP_API_URL}/user/byId/${data.review.userId}`;
  useEffect(() => {
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {user.username}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
          >
            {data.review.createdAt.slice(5, 7)}/
            {data.review.createdAt.slice(8, 10)}/
            {data.review.createdAt.slice(0, 4)}{" "}
            {data.review.createdAt.slice(11, 19)}
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
          {data.review.content}
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
