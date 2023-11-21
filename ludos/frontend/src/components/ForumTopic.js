import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";

function ForumTopic(data) {
  const boxStyle = {
    backgroundColor: "rgba(200, 200, 200, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };
  const headerStyle = {
    color: "black",
    fontFamily: "Trebuchet MS, sans-serif",
    marginBottom: "10px",
  };
  const forumStyle = { color: "rgb(0, 150, 255)", fontWeight: "bold" };
  const userStyle = { color: "rgb(100, 80, 90)", marginRight: "2%" };

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
            {data.topic.forumGame}
          </Typography>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            {data.topic &&
              data.topic.forumTags.map((tag1, index1) => (
                <Typography
                  variant="caption"
                  component="div"
                  style={tagBox}
                  key={index1}
                >
                  {tag1.toString()}
                </Typography>
              ))}
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
            {data.topic.userOpened}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
          >
            {data.topic.whenOpened}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            textAlign="right"
            style={forumStyle}
          >
            replies: {data.topic.numOfReplies.toString()}
          </Typography>
        </Grid>

        <Typography
          variant="h7"
          component="div"
          textAlign="left"
          style={headerStyle}
        >
          {data.topic.title.toString()}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ForumTopic;
