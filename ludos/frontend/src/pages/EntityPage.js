import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function EntityPage() {
  const [shortEntityFeatures, setShortEntityFeatures] = useState({});
  const [longEntityFeatures, setLongEntityFeatures] = useState({});
  const [entity, setEntity] = useState({});
  let { entityId } = useParams();

  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/entity/${entityId}`;

    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setEntity(response.data);
        let shorts = {};
        let longs = {};
        Object.keys(response.data?.content).map((keyName, i) => {
          if (
            response.data.content[keyName].length < 50 &&
            keyName !== "Image Link"
          ) {
            shorts = {
              ...shorts,
              [keyName]: response.data?.content[keyName],
            };
          } else if (keyName !== "Image Link") {
            longs = {
              ...longs,
              [keyName]: response.data?.content[keyName],
            };
          }
          setShortEntityFeatures(shorts);
          setLongEntityFeatures(longs);
          setEntity(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const convertToSlug = (text) => {
    return text
      ?.toString()
      ?.toLowerCase()
      ?.trim()
      ?.replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      ?.replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      ?.replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  const headerStyle = {
    marginBottom: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
    marginLeft: "2%",
  };
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
    marginBottom: "15px",
  };

  const imageBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "10px",
    height: "auto",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginLeft: "2%",
    marginBottom: "1%",
    flexDirection: "column",
  };

  const smallBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "rgb(0, 150, 255)",
    borderRadius: "10px",
    width: "80%",
    height: "auto",
    marginTop: "5px",
    marginBottom: "5px",
    marginRight: "5%",
    marginLeft: "3%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    padding: "10px", // Add padding to give some space between the content and the border
  };

  return (
    <Container
      style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "1200px" }}
    >
      <Grid container spacing={1} style={boxStyle}>
        <Box p={0} style={{ width: "100%", marginTop: "3%" }}>
          <Typography
            style={{
              fontSize: "25px",
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            {entity.name}
          </Typography>
        </Box>
        <Grid item xs={12} sm={3} md={3} lg={3} style={imageBoxStyle}>
          <img
            src={entity?.content?.["Image Link"]}
            alt={entity?.name}
            style={{ height: 350, width: 250 }}
          />
          <Box style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              <Link
                style={{ color: smallBoxStyle.color, textDecoration: "none" }}
                to={`/game/${convertToSlug(entity.game?.title)}`}
              >
                Game: {entity.game?.title}
              </Link>
            </Typography>
          </Box>
          <Box style={smallBoxStyle}>
            <Typography
              component="legend"
              style={{ fontFamily: "Trebuchet MS, sans-serif" }}
            >
              Entity Type:{" "}
              {entity.type?.charAt(0).toUpperCase() + entity.type?.slice(1)}
            </Typography>
          </Box>
          {Object.keys(shortEntityFeatures).map((keyName, i) => (
            <Box style={smallBoxStyle} key={i}>
              <Typography
                component="legend"
                style={{ fontFamily: "Trebuchet MS, sans-serif" }}
              >
                {keyName}: {shortEntityFeatures[keyName]}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} style={{ width: "100%" }}>
          {Object.keys(longEntityFeatures).map((keyName, i) => (
            <>
              <Typography
                variant="h5"
                color="gray"
                align="left"
                style={headerStyle}
              >
                {keyName}
              </Typography>
              <Typography
                variant="body1"
                color="white"
                align="left"
                style={{
                  marginBottom: "8px",
                  fontFamily: "Trebuchet MS, sans-serif",
                  marginLeft: "2%",
                }}
              >
                {longEntityFeatures[keyName]}
              </Typography>
            </>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default EntityPage;
