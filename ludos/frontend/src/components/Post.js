import React, { useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";

function Post(data) {
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };
  const headerStyle = {
    color: "white",
    fontFamily: "Trebuchet MS, sans-serif",
    marginBottom: "10px",
  };
  const forumStyle = { color: "rgb(0, 150, 255)" };
  const userStyle = { color: "rgb(0, 250, 255)", marginRight: "2%" };
  const followButton = {
    backgroundColor: "rgb(255, 165, 0)",
    color: "rgb(0, 0, 0)",
    height: "20px",
    textTransform: "none",
  };
  const descriptionStyle = { color: "white" };
  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0, 150, 255)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
  };
  const commentButton = {
    justifyContent: "space-between",
    marginRight: "5px",
    display: "flex",
    height: "auto",
  };
  const upVoteButton = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    marginRight: "5px",
    height: commentButton.height,
  };
  const downVoteButton = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    marginRight: "5px",
    display: "flex",
    height: commentButton.height,
  };

  useEffect(() => {}, []);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box p={5} style={boxStyle}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="caption" component="div" style={forumStyle}>
            {data.post.forum}
          </Typography>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            {data.post &&
              data.post.tags.map((data1, index1) => (
                <Typography
                  variant="caption"
                  component="div"
                  style={tagBox}
                  key={index1}
                >
                  {data1}
                </Typography>
              ))}
            <Button variant="contained" style={followButton}>
              Follow
            </Button>
          </Grid>
        </Grid>
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
            {data.post.userName}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
          >
            {data.post.timestamp}
          </Typography>
        </Grid>
        <Typography
          variant="h4"
          component="div"
          textAlign="left"
          style={headerStyle}
        >
          {data.post.header}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="left"
          style={descriptionStyle}
        >
          {data.post.description}
        </Typography>
        <Grid
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Button variant="contained" style={commentButton}>
            <FaComment />
            {data.post.numberOfComments}
          </Button>
          {data.showButtons && (
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

export default Post;
