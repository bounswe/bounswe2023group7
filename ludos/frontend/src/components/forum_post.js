import React, { useEffect } from "react";
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Comment, MoreHoriz } from "@mui/icons-material";

function Post(data, key) {
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
  const usernameStyle = { color: "rgb(255, 255, 0)" };
  const timestampStyle = { color: "rgb(255, 255, 0)" };
  const forumStyle = { color: "rgb(0, 150, 255)" };

  const descriptionStyle = { color: "white" };
  const iconStyle = {
    color: "white", // Set the color to white
  };
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
  const upVoteButton = {
    backgroundColor: "rgb(124, 252, 0)",
    marginRight: "5px",
  };
  const downVoteButton = { backgroundColor: "rgb(222, 49, 99)" };
  useEffect(() => {}, []);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} key={key}>
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
          <Typography variant="caption" component="div" style={usernameStyle}>
            {data.post.username}
          </Typography>
          <Typography variant="caption" component="div" style={timestampStyle}>
            {data.post.timestamp}
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
          </Grid>
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
          <Button variant="contained" style={upVoteButton}>
            <FaArrowUp style={{ color: "black" }} />
          </Button>
          <Button variant="contained" style={downVoteButton}>
            <FaArrowDown />
          </Button>
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "5px",
            marginBottom: "-30px",
          }}
        >
          <IconButton style={iconStyle}>
            <Comment />
          </IconButton>
          <IconButton style={iconStyle}>
            <MoreHoriz />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Post;
