import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
//isUpcomingTitle, launching date and demo link is needed
function ForumTopic(data) {
  console.log(data.topic);
  const directLink = `/profile-page/${data.topic.user?.id}`;
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
    //height: "fit-content",
    width: "max-content",
  };
  const forumStyle = {
    backgroundColor: "rgb(200, 10, 10)",
    color: "white",
    borderRadius: "10px",
    padding: "2px",
    marginBottom: "8px",
    fontWeight: "bold",
    alignItems: "center",
    display: "flex",
  };

  const upcomingStyle = {
    backgroundColor: "rgb(87, 0, 126)",
    height: "6px",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
    marginBottom: "8px",
    fontWeight: "bold",
    alignItems: "center",
    display: "flex",
    marginRight: "5px",
  };
  const userStyle = { color: "rgb(255, 255, 255)", marginRight: "2%" };

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
  useEffect(() => { }, []);

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
        minHeight: "90px",
        marginBottom: "10px",
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
          component="img"
          sx={{
            height: 48,
            width: 48,
            borderRadius: "50%",
            alignSelf: "center",
            paddingBottom: "10px",
          }}
          src={
            data.topic.user?.avatar ||
            "https://p7.hiclipart.com/preview/173/464/909/clip-art-pokeball-png.jpg"
          }
        />
        <Typography
          variant="caption"
          component="div"
          style={{
            color: "white",
            marginTop: "3px",
            textAlign: "center",
          }}
        >
          @
          <Link to={directLink} style={userStyle}>
            {data.topic.user?.username}
          </Link>
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
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption" component="div" style={forumStyle}>
              {data.topic.game?.title}
            </Typography>
            {data.topic.upcomingTitle != null &&
              data.topic.upcomingTitle.isUpcomingTitle && (
                <Typography
                  variant="caption"
                  component="div"
                  style={upcomingStyle}
                >
                  Upcoming Title
                </Typography>
              )}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            {data.topic &&
              data.topic.tags?.map((tag1, index1) => (
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
        <Link to={`/thread/${data.topic.id}`} style={userStyle}>
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
              fontSize: "20px",
            }}
          >
            {data.topic.title}
          </Typography>
        </Link>
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
              margin: "5% 5% 1% 5%",
              alignSelf: "center",
            }}
          ></div>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:
                data.topic.upcomingTitle != null &&
                  data.topic.upcomingTitle.isUpcomingTitle
                  ? "space-between"
                  : "flex-end",
            }}
          >
            {data.topic.upcomingTitle != null &&
              data.topic.upcomingTitle.isUpcomingTitle && (
                <Grid
                  style={{
                    marginLeft: "8px",
                    justifyContent: "center",
                    display: "flex",
                    gap: "2px",
                  }}
                >
                  <RocketLaunchIcon />
                  <Typography
                    variant="caption"
                    component="div"
                    style={{
                      color: "white",
                      marginTop: "3px",
                      marginLeft: "3px",
                      marginRight: "5px",
                    }}
                  >
                    {data.topic.upcomingTitle.launchingDate}
                  </Typography>
                  <a
                    href={data.topic.upcomingTitle.demoLink}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "flex",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <LaunchIcon />
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
                      Go to demo
                    </Typography>
                  </a>
                </Grid>
              )}

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
                @{data.topic.user?.username}
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
                {data.topic.createdAt?.split("T")[0]}{" "}
                {data.topic.createdAt?.split("T")[1].split(".")[0]}
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
    </Grid>
  );
}

export default ForumTopic;
