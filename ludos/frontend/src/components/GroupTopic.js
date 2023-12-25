import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BadgeIcon from "@mui/icons-material/Badge";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function GroupTopic(data) {
  console.log(data);
  const [isUserJoined, SetIsUserJoined] = useState(data.topic.isJoined);

  const setMembership = () => {
    if (isUserJoined) {
      const followLink = `http://${process.env.REACT_APP_API_URL}/group/leave/${data.topic.id}`;
      axios
        .put(
          followLink,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        )
        .then(() => {
          SetIsUserJoined(!isUserJoined);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const followLink = `http://${process.env.REACT_APP_API_URL}/group/join/${data.topic.id}`;
      axios
        .put(
          followLink,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        )
        .then(() => {
          SetIsUserJoined(!isUserJoined);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const boxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingBottom: "16px",
    borderRadius: "10px",
    paddingTop: "8px",
    //border: "4px solid rgba(51, 153, 255, 1)", // Çerçeve rengi ve genişliği
    boxSizing: "border-box", // Kutu modelini içerir
    minHeight: "100px",
    fontFamily: "Trebuchet MS, sans-serif",
    maxHeight: "200px",
  };
  const headerStyle = {
    color: "white",
    fontFamily: "Trebuchet MS, sans-serif",
    // marginBottom: "10px",
  };
  const forumStyle = {
    color: "rgb(100, 70, 144)",
    fontWeight: "bold",
    fontFamily: "Trebuchet MS, sans-serif",
  };
  const gameStyle = {
    backgroundColor: "rgba(200 ,10 ,10, 1)",
    color: "white",
    borderRadius: "10px",
    padding: "2px",
    fontWeight: "bold",
    fontSize: "13px",
    width: "100%",
    marginBottom: "10px",
    textDecoration: "none",
    fontFamily: "Trebuchet MS, sans-serif",
  };
  const userStyle = {
    color: "white",
    fontFamily: "Trebuchet MS, sans-serif",
  };

  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 150, 30, 1)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
    fontFamily: "Trebuchet MS, sans-serif",
  };
  console.log(data);

  const convertToSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      style={{
        //gap: "16px",
        display: "flex",
        flexDirection: "column",
        //marginBottom: "20px",
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
            <Link
              style={gameStyle}
              to={`/game/${convertToSlug(data.topic.game.title)}`}
            >
              {data?.topic?.game?.title}
            </Link>
          </Typography>
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
              textAlign="right"
              style={{
                fontStyle: "italic",
                marginRight: "10px",
                color: "black",
              }}
            >
              <Link
                style={userStyle}
                to={`/profile-page/${data.topic.admin.id}`}
              >
                @{data.topic.admin.username}
              </Link>
            </Typography>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "right" }}>
            {data.topic &&
              data.topic.tags?.map((tag1, index1) => (
                <Typography
                  variant="caption"
                  component="div"
                  style={tagBox}
                  key={index1}
                >
                  {tag1}
                </Typography>
              ))}
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          component="div"
          textAlign="left"
          style={headerStyle}
        >
          <Link style={userStyle} to={`/group/${data.topic.id}`}>
            {data.topic.name}
          </Link>
        </Typography>
        {/** 
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
            {data.topic.description}
          </Typography>
        </Grid>
        */}
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AccessTimeIcon style={{ fontSize: "18px", marginRight: "3px" }} />
            <Typography
              variant="caption"
              component="div"
              textAlign="left"
              style={{
                fontStyle: "italic",
                marginRight: "10px",
                color: "black",
              }}
            >
              {data.topic.createdAt.split("T")[0] +
                " " +
                data.topic.createdAt.split("T")[1].split(".")[0]}
            </Typography>
            <Diversity1Icon style={{ fontSize: "18px", marginRight: "3px" }} />
            <Typography
              variant="caption"
              component="div"
              textAlign="right"
              style={forumStyle}
            >
              {data.topic.maxNumberOfMembers}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={setMembership}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              borderRadius: "10px",
              textTransform: "none",
              backgroundColor: "rgba(37 ,137 ,216, 0.7)",
            }}
          >
            {isUserJoined ? "Leave the Group" : "Join Us"}
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default GroupTopic;
