import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Link } from "react-router-dom";

function ForumTopic(data) {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/profile-page/${userId}`);
  };

  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 150, 30)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
  };
  const forumStyle = {
    backgroundColor: "rgb(200, 10, 10)",
    color: "white",
    borderRadius: "10px",
    padding: "2px",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  /*
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
  const forumStyle = { color: "rgb(100, 70, 144)", fontWeight: "bold" };
  const gameStyle = {
    backgroundColor: "rgb(9 ,63 ,83)",
    color: "white", 
    borderRadius: "10px",
    padding: "2px",
    fontWeight: "bold",
    fontSize: "13px",
  }
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
*/
  useEffect(() => {}, []);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxHeight: "150px",
      }}
    >
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(200,200,200,0.6)",
          width: "160px",
          justifyContent: "center",
          borderBottomLeftRadius: "10px",
          borderTopLeftRadius: "10px",
          paddingTop: "20px",
          padding: "32.25px 40px 32.25px",
          alignItems: "center",
        }}
      >
        <Box
          onClick={() => handleClick(data.topic.user_id)}
          style={{ cursor: "pointer" }}
          component="img"
          sx={{
            height: 48,
            width: 48,
            borderRadius: "50%",
            alignSelf: "center",
            paddingBottom: "10px",
          }}
          src={
            data.topic.imgsrc ||
            "https://p7.hiclipart.com/preview/173/464/909/clip-art-pokeball-png.jpg"
          }
        />
        <Typography
          onClick={() => handleClick(data.topic.user_id)}
          variant="caption"
          component="div"
          style={{
            color: "white",
            marginTop: "3px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          @{data.topic.userOpened}
        </Typography>
      </Grid>

      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          backgroundColor: "rgb(255,255,255,0.6)",
          padding: "5px",
          borderBottomRightRadius: "10px",
          borderTopRightRadius: "10px",
          width: "100%",
        }}
      >
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
                  {tag1?.toString()}
                </Typography>
              ))}
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          component="div"
          style={{
            color: "white",
            marginTop: "3px",
            marginRight: "10px",
            display: "flex",
            marginLeft: "10px",
            textAlign: "center",
            lineHeight: "1.7",
          }}
        >
          <Link
            to={`http://localhost:3000/thread/${data.topic.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {data.topic.title}
          </Link>
        </Typography>

        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: "15px",
          }}
        >
          <div
            style={{
              width: "94%",
              height: "1px",
              color: "rgb(180, 180, 180)",
              backgroundColor: "rgb(200, 200, 200)",
              margin: "5% 5% 3% 5%",
              alignSelf: "center",
            }}
          ></div>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <Person2Icon />
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            >
              @{data.topic.userOpened}
            </Typography>
            <AccessTimeIcon />
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
                marginRight: "3px",
                display: "flex",
                marginLeft: "3px",
                marginBottom: "10px",
              }}
            >
              {data.topic.whenOpened}
            </Typography>
            <MapsUgcIcon />
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
                marginLeft: "3px",
              }}
            >
              {data.topic.numOfReplies}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ForumTopic;
