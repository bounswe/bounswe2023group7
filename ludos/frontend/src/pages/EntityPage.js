import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function EntityPage() {
  const [entity, setEntity] = useState({});
  let { entityId } = useParams();
  console.log(entity);

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            src={entity?.content?.image}
            alt={entity?.name}
            style={{ height: 350, width: 250 }}
          />
          {entity?.content &&
            Object.keys(entity?.content).map((keyName, i) =>
              keyName === "image" ? null : (
                <Box style={smallBoxStyle} key={i}>
                  <Typography
                    component="legend"
                    style={{ fontFamily: "Trebuchet MS, sans-serif" }}
                  >
                    {keyName}: {entity?.content[keyName]}
                  </Typography>
                </Box>
              ),
            )}
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} style={{ width: "100%" }}>
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
            {entity.bio}
            {
              "Nina Williams (ニーナ・ウィリアムズ Nīna Wiriamuzu?) is a cold-blooded Irish assassin that made her first appearance in the original Tekken game and has appeared in every Tekken game since. Nina has a lethal fighting style, consisting of throws, grapples, and holds. She has an infamous rivalry with her younger sister, Anna Williams."
            }
          </Typography>
          <Typography
            variant="h5"
            color="gray"
            align="left"
            style={headerStyle}
          >
            STORY
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
            Nina and her younger sister are from a family of assassins hailing
            from the Republic of Ireland. Nina was trained in assassination arts
            by her father and in aikido by her mother. Anna was trained
            alongside Nina, and the two developed a deadly rivalry, often
            attempting to humiliate or kill one another.
          </Typography>
        </Grid>
        <Grid style={{ width: "100%" }}></Grid>
      </Grid>
    </Container>
  );
}

export default EntityPage;
