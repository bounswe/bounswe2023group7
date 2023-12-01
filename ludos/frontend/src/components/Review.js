import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  //Rating,
  TextField,
} from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function Review(data, index1) {
  const [username, setUsername] = useState("");
  const [editReq, setEditReq] = useState(false);
  const [review, setReview] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const link = `http://${process.env.REACT_APP_API_URL}/user/byId/${data.review.userId}`;
  const directLink = `/profile-page/${data.review.userId}`;

  useEffect(() => {
    setReview(data.review.content);
    setLiked(data.review.isLikedByUser);
    setDisliked(data.review.isDislikedByUser);
    setLikeCount(data.review.likedUserCount);
    setDislikeCount(data.review.dislikedUserCount);
    console.log(data.review);
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUsername(response.data.username);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const link = `http://${process.env.REACT_APP_API_URL}/review/${data.review.reviewId}/`;
    const formData = {
      rating: 5,
      content: review,
    };
    axios
      .put(link, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        data.review.content = review;
        setEditReq(false);
      })
      .catch((error, request) => {
        console.log(request);
        console.error("Error on making review:", error);
      });
  };

  const handleLikeClick = () => {
    if (!data.review.isBelongToUser) {
      const followLink = `http://${process.env.REACT_APP_API_URL}/review/${data.review.reviewId}/like`;
      axios
        .post(
          followLink,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        )
        .then(() => {
          if (disliked) {
            setDisliked(false);
            setLiked(true);
            setDislikeCount(dislikeCount - 1);
            setLikeCount(likeCount + 1);
          } else if (liked) {
            setLiked(false);
            setLikeCount(likeCount - 1);
          } else {
            setLikeCount(likeCount + 1);
            setLiked(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleDislikeClick = () => {
    if (!data.review.isBelongToUser) {
      const followLink = `http://${process.env.REACT_APP_API_URL}/review/${data.review.reviewId}/dislike`;
      axios
        .post(
          followLink,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        )
        .then(() => {
          if (liked) {
            setLiked(false);
            setDisliked(true);
            setLikeCount(likeCount - 1);
            setDislikeCount(dislikeCount + 1);
          } else if (disliked) {
            setDisliked(false);
            setDislikeCount(dislikeCount - 1);
          } else {
            setDislikeCount(dislikeCount + 1);
            setDisliked(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

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
  const editButton = {
    backgroundColor: "rgb(60, 165, 0)",
    color: "rgb(255, 255, 255)",
    height: "20px",
    width: "auto",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
    marginRight: "5px",
  };
  const deleteButton = {
    backgroundColor: "rgb(222, 49, 99)",
    color: "rgb(255, 255, 255)",
    height: "20px",
    width: "auto",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
  };

  return (
    <>
      {" "}
      {!editReq ? (
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
                <Link style={userStyle} to={directLink}>
                  {username}
                </Link>
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
              {/*
                <Rating
                  name="game-rating"
                  value={data.review.rating}
                  disabled={true}
                  precision={1}
                />
            */}
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
              {data.showButton && !data?.review?.isBelongToUser && (
                <>
                  <Button
                    variant="contained"
                    style={upVoteButton}
                    onClick={handleLikeClick}
                  >
                    {liked ? (
                      <FaThumbsUp style={{ color: "rgb(255, 255, 255)" }} />
                    ) : (
                      <FaThumbsUp style={{ color: "rgb(124, 252, 0)" }} />
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      textAlign="left"
                      style={{
                        color: "rgb(255, 255, 255)",
                        marginLeft: "5px",
                      }}
                    >
                      {likeCount}
                    </Typography>
                  </Button>

                  <Button
                    variant="contained"
                    style={downVoteButton}
                    onClick={handleDislikeClick}
                  >
                    {disliked ? (
                      <FaThumbsDown style={{ color: "rgb(100, 100, 100)" }} />
                    ) : (
                      <FaThumbsDown style={{ color: "rgb(222, 49, 99)" }} />
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      textAlign="left"
                      style={{
                        color: "rgb(255, 255, 255)",
                        marginLeft: "5px",
                      }}
                    >
                      {dislikeCount}
                    </Typography>
                  </Button>
                </>
              )}
              {data.showButton && data.review.isBelongToUser && (
                <>
                  <Button
                    variant="contained"
                    style={editButton}
                    onClick={() => setEditReq(true)}
                  >
                    Edit Your Review
                  </Button>
                  <Button
                    variant="contained"
                    style={deleteButton}
                    onClick={() => data.delete(true, data.review.reviewId)}
                  >
                    Delete Your Review
                  </Button>
                  <Button
                    variant="contained"
                    style={upVoteButton}
                    onClick={handleLikeClick}
                  >
                    <FaThumbsUp style={{ color: "rgb(255, 255, 255)" }} />

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      textAlign="left"
                      style={{
                        color: "rgb(255, 255, 255)",
                        marginLeft: "5px",
                      }}
                    >
                      {data.review?.likedUserCount}
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    style={downVoteButton}
                    onClick={handleDislikeClick}
                  >
                    <FaThumbsDown style={{ color: "rgb(100, 100, 100)" }} />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      textAlign="left"
                      style={{
                        color: "rgb(255, 255, 255)",
                        marginLeft: "5px",
                      }}
                    >
                      {data.review?.dislikedUserCount}
                    </Typography>
                  </Button>
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      ) : (
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
            id="content"
            multiline
            rows={4}
            value={review}
            onChange={handleChange}
            variant="outlined" // You can choose the variant you prefer
            fullWidth
            InputProps={{
              style: { color: "white" }, // Apply custom styles to the input element
            }}
          />
          <Grid style={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleSubmit} style={{ marginTop: "3%" }}>
              Enter
            </Button>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Review;
