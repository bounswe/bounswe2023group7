import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BadgeIcon from "@mui/icons-material/Badge";
import { Button } from "@mui/material";

function GroupTopic(data) {
  const boxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    paddingTop: "8px",
  };
  const headerStyle = {
    color: "black",
    fontFamily: "Trebuchet MS, sans-serif",
    marginBottom: "10px",
  };
  const forumStyle = { color: "rgb(100, 70, 144)", fontWeight: "bold" };
  const gameStyle = {
    backgroundColor: "rgb(9 ,63 ,83)",
    color: "white",
    borderRadius: "10px",
    padding: "2px",
    fontWeight: "bold",
    fontSize: "13px",
  };
  const userStyle = { color: "rgb(100, 80, 90)", marginRight: "2%" };

  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(19, 142, 19)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
  };

  useEffect(() => {}, []);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      style={{
        gap: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={5} style={boxStyle}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="caption" component="div" style={gameStyle}>
            {data.topic.groupGame}
          </Typography>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            {data.topic &&
              data.topic.groupTags.map((tag1, index1) => (
                <Typography
                  variant="caption"
                  component="div"
                  style={tagBox}
                  key={index1}
                >
                  {tag1?.toString()}
                </Typography>
              ))}
          </Grid>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "left",
              marginBottom: "10px",
              marginTop: "5px",
              width: " 100%",
            }}
          >
            <BadgeIcon style={{ fontSize: "18px", marginRight: "3px" }} />
            <Typography
              variant="caption"
              component="div"
              textAlign="left"
              style={userStyle}
            >
              {data.topic.userOpened}
            </Typography>
            <AccessTimeIcon style={{ fontSize: "18px", marginRight: "3px" }} />
            <Typography
              variant="caption"
              component="div"
              textAlign="left"
              style={userStyle}
            >
              {data.topic.whenOpened}
            </Typography>
            <Diversity1Icon style={{ fontSize: "18px", marginRight: "3px" }} />
            <Typography
              variant="caption"
              component="div"
              textAlign="right"
              style={forumStyle}
            >
              {data.topic.numOfMembers?.toString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h7"
            component="div"
            textAlign="left"
            style={headerStyle}
          >
            {data.topic.title?.toString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            type="button"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              borderRadius: "10px",
            }}
          >
            Join
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default GroupTopic;
