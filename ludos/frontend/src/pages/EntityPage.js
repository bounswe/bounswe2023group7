import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Recogito } from "@recogito/recogito-js";

const axiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});


function EntityPage() {
  const [shortEntityFeatures, setShortEntityFeatures] = useState({});
  const [longEntityFeatures, setLongEntityFeatures] = useState({});
  const [entity, setEntity] = useState({});
  let { entityId } = useParams();

  const entityAnnotatorRef = useRef(null);

  useEffect(() => {
    if (entity && entity.description) {
      entityAnnotatorRef.current = new Recogito({
        content: "entity-description",
      });

      fetchAnnotations();

      entityAnnotatorRef.current.on(
        "createAnnotation",
        handleCreateAnnotation,
      );

    }
  })

  const handleCreateAnnotation = async (annotation) => {
    // Prepare your API request body
    const requestBody = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value, // You might need to format this according to your backend expectations
      tags: annotation.tags,
      target: {
        source: window.location.href,
        selector: {
          start: annotation.target.selector[1].start, // Starting character index
          end: annotation.target.selector[1].end, // Ending character index
        },
      },
    };

    // Make the API call to your server
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API_URL}/annotation/entity/${entity?.id}`,
        requestBody,
      );
      console.log("Annotation saved:", response.data);
    } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };

  const fetchAnnotations = async () => {
    try {
      await axiosInstance.get(`/annotation/entity/${entityId}`)
        .then((response) => {

          if (response.data) {
            displayEntityDescAnnotations(response.data);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }


  const displayEntityDescAnnotations = (entityDescAnnotation) => {
    if (entityAnnotatorRef.current) {
      entityDescAnnotation.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        entityAnnotatorRef.current.addAnnotation({
          "@context": "http://www.w3.org/ns/anno.jsonld",
          type: "Annotation",
          id: annotation.id,
          body: [
            {
              type: "TextualBody",
              value: annotation.body,
              purpose: "commenting",
            },
          ],
          target: {
            selector: [
              {
                type: "TextQuoteSelector",
                exact: annotation.body,
              },
              {
                type: "TextPositionSelector",
                start: annotation.target.selector.start,
                end: annotation.target.selector.end,
              },
            ],
          },
        });
      });
    }
  }



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
        Object.keys(response.data?.content).map((keyName) => {
          if (
            response.data.content[keyName].length < 50 &&
            keyName !== "image"
          ) {
            shorts = {
              ...shorts,
              [keyName]: response.data?.content[keyName],
            };
          } else if (keyName !== "image") {
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
            src={entity?.content?.image}
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
          <Typography
            variant="h5"
            color="gray"
            align="left"
            style={headerStyle}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            color="white"
            align="left"
            component="div"
            id="entity-description"
            style={{
              marginBottom: "8px",
              fontFamily: "Trebuchet MS, sans-serif",
              marginLeft: "2%",
            }}
          >
            {entity?.description}
          </Typography>

          {Object.keys(longEntityFeatures).map((keyName) => (
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
