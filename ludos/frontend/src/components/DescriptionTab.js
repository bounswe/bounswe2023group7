import React, { useEffect, useRef } from "react";
import { Typography, Grid } from "@mui/material";
import { Recogito } from "@recogito/recogito-js";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

function Description(data) {
  const gameStoryAnnotatorRef = useRef(null);
  const gameGuideAnnotatorRef = useRef(null);

  useEffect(() => {
    if (data && data.story) {
      gameStoryAnnotatorRef.current = new Recogito({
        content: "game-story",
        // Other initialization...
      });

      fetchStoryAnnotations();
      gameStoryAnnotatorRef.current.on(
        "createAnnotation",
        handleCreateStoryAnnotation,
      );
      gameStoryAnnotatorRef.current.on(
        "deleteAnnotation",
        handleDeleteAnnotation,
      );

      return () => gameStoryAnnotatorRef.current.destroy();
    }
  }, [data]);

  const handleCreateStoryAnnotation = async (annotation) => {
    // Prepare your API request body
    const requestBody = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value, // You might need to format this according to your backend expectations
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
      console.log(data);
      const response = await axios.post(
        `http://${process.env.REACT_APP_API_URL}/annotation/gamestory/${data.id}`,
        requestBody,
      );
      console.log("Annotation saved:", response.data);
    } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };

  // ... existing useEffect code for other functionalities

  // Function to fetch annotations
  const fetchStoryAnnotations = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/annotation/gamestory/${data.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );

      if (response.data) {
        console.log(response);
        displayGameStoryAnnotations(response.data);
      }
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const displayGameStoryAnnotations = (gameStoryAnnotations) => {
    if (gameStoryAnnotatorRef.current) {
      gameStoryAnnotations.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        gameStoryAnnotatorRef.current.addAnnotation({
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
  };

  useEffect(() => {
    if (data && data.guide) {
      gameGuideAnnotatorRef.current = new Recogito({
        content: "game-guide",
        // Other initialization...
      });

      fetchGuideAnnotations();
      gameGuideAnnotatorRef.current.on(
        "createAnnotation",
        handleCreateGuideAnnotation,
      );
      gameGuideAnnotatorRef.current.on(
        "deleteAnnotation",
        handleDeleteAnnotation,
      );

      return () => gameGuideAnnotatorRef.current.destroy();
    }
  }, [data]);

  const handleCreateGuideAnnotation = async (annotation) => {
    // Prepare your API request body
    const requestBody = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value, // You might need to format this according to your backend expectations
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
        `http://${process.env.REACT_APP_API_URL}/annotation/gameguide/${data.id}`,
        requestBody,
      );
      console.log("Annotation saved:", response.data);
    } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };

  // ... existing useEffect code for other functionalities

  // Function to fetch annotations
  const fetchGuideAnnotations = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/annotation/gameguide/${data.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );

      if (response.data) {
        displayGameGuideAnnotations(response.data);
      }
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const displayGameGuideAnnotations = (gameGuideAnnotations) => {
    if (gameGuideAnnotatorRef.current) {
      gameGuideAnnotations.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        gameGuideAnnotatorRef.current.addAnnotation({
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
  };

  const headerStyle = {
    marginBottom: "8px",
    fontFamily: "Trebuchet MS, sans-serif",
    borderBottom: "2px solid gray",
    paddingBottom: "4px",
  };

  const gameTriviaAnnotatorRef = useRef(null);

  useEffect(() => {
    if (data && data.trivia) {
      gameTriviaAnnotatorRef.current = new Recogito({
        content: "game-trivia",
      });

      fetchAnnotations();

      gameTriviaAnnotatorRef.current.on(
        "createAnnotation",
        handleCreateAnnotation,
      );
      gameTriviaAnnotatorRef.current.on(
        "deleteAnnotation",
        handleDeleteAnnotation,
      );
    }
  });

  const parseId = (id) => {
    const parts = id.split("/");
    return {
      source: parts[0],
      type: parts[1],
      itemId: parts[2],
      date: parts[3],
    };
  };

  const handleCreateAnnotation = async (annotation) => {
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

    axiosInstance
      .post(`/annotation/gametrivia/${data.gameId}`, requestBody)
      .then((response) => {
        console.log("Annotation saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving annotation:", error);
      });
  };

  const handleDeleteAnnotation = async (annotation) => {
    try {
      const { source, type, itemId, date } = parseId(annotation.id);
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/${source}/${type}/${itemId}/${date}`;

      const response = await axios.delete(url);

      console.log("Annotation deleted:", response.data);
    } catch (error) {
      console.error("Error deleting annotation:", error);
    }
  };

  const fetchAnnotations = async () => {
    try {
      await axiosInstance
        .get(`/annotation/gametrivia/${data?.gameId}`)
        .then((response) => {
          if (response.data) {
            displayGameTriviaAnnotations(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const displayGameTriviaAnnotations = (gameTriviaAnnotations) => {
    if (gameTriviaAnnotatorRef.current) {
      gameTriviaAnnotations.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        gameTriviaAnnotatorRef.current.addAnnotation({
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
  };

  return (
    <Grid style={{ width: "100%" }}>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        STORY
      </Typography>
      <Typography
        variant="body1"
        color="white"
        id="game-story"
        align="left"
        style={{
          marginBottom: "8px",
          fontFamily: "Trebuchet MS, sans-serif",
        }}
      >
        {data.story}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        GUIDE
      </Typography>
      <Typography
        variant="body1"
        color="white"
        align="left"
        id="game-guide"
        style={{
          marginBottom: "8px",
          fontFamily: "Trebuchet MS, sans-serif",
        }}
      >
        {data.guide}
      </Typography>
      <Typography variant="h5" color="gray" align="left" style={headerStyle}>
        TRIVIA
      </Typography>
      <Typography
        component="div"
        id="game-trivia"
        variant="body1"
        color="white"
        align="left"
        style={{
          marginBottom: "8px",
          fontFamily: "Trebuchet MS, sans-serif",
        }}
      >
        {data.trivia}
      </Typography>
    </Grid>
  );
}

export default Description;
