import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function EntityTab(data) {
  const [characters, setCharacters] = useState([]);
  const [items, setItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/entity/game/${data.gameId}`;

    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        let chars = [];
        let its = [];
        let ars = [];
        let pcks = [];
        response.data.map((entity, index) => {
          if (entity.type === "character") {
            chars.push(entity);
          } else if (entity.type === "item") {
            its.push(entity);
          } else if (entity.type === "area") {
            ars.push(entity);
          } else if (entity.type === "package") {
            pcks.push(entity);
          }
        });
        setCharacters(chars);
        setItems(its);
        setAreas(ars);
        setPackages(pcks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddEntityClick = () => {
    if (data.auth) {
      // If the user is logged in, redirect to the create game page
      navigate("/create-entity");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/signup");
    }
  };

  const entityButtonStyle = {
    backgroundColor: "rgb(125, 165, 0)",
    color: "rgb(255, 255, 255)",
    height: "20px",
    width: "15%",
    marginLeft: "0%",
    textTransform: "none",
    fontFamily: "Trebuchet MS, sans-serif",
  };

  const headerStyle = {
    marginBottom: "8px",
    marginTop: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
  };
  return (
    <Grid style={{ width: "100%" }}>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        CHARACTERS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {characters.map((character, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/entity/${character.id}`}
            >
              {character.name}
            </Link>
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        ITEMS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {items.map((item, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/entity/${item.id}`}
            >
              {item.name}
            </Link>
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        AREAS
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {areas.map((area, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/entity/${area.id}`}
            >
              {area.name}
            </Link>
          </Typography>
        ))}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        PACKAGES
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        style={{ marginBottom: "8px", fontFamily: "Trebuchet MS, sans-serif" }}
      >
        {packages.map((dlc, index1) => (
          <Typography
            variant="body1"
            color="white"
            align="center"
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
            }}
            key={index1}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/entity/${dlc.id}`}
            >
              {dlc.name}
            </Link>
          </Typography>
        ))}
      </Typography>
      <Typography
        variant="h5"
        color="gray"
        align="left"
        style={headerStyle}
      ></Typography>
      <Button
        variant="contained"
        style={entityButtonStyle}
        onClick={handleAddEntityClick}
      >
        Add an Entity
      </Button>
    </Grid>
  );
}

export default EntityTab;
