import React, { useState, useEffect, useRef } from "react";
import { Recogito } from "@recogito/recogito-js";
import "@recogito/recogito-js/dist/recogito.min.css";
import { Annotorious } from "@recogito/annotorious";
import "@recogito/annotorious/dist/annotorious.min.css";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
//import ReplyIcon from "@mui/icons-material/Reply";

function ThreadComponent({
  imgsrc,
  contentImg,
  username,
  date,
  content,
  userId,
  numLikes,
  numDislikes,
  threadId,
  isLiked,
  isDisliked,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [likes, setLikes] = useState(numLikes);
  const [dislikes, setDislikes] = useState(numDislikes);
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const upVoteButton = {
    backgroundColor: "transparent",
    marginRight: "5px",
    height: "auto",
  };
  const downVoteButton = {
    backgroundColor: "transparent",
    marginRight: "5px",
    display: "flex",
    height: "auto",
  };

  const onAnnotationCreated = async (annotation) => {
    const postData = formatAnnotationData(annotation);
    await sendAnnotationData(postData, "create");
  };
  /*
  const onAnnotationUpdated = async (annotation) => {
    const postData = formatAnnotationData(annotation);
    await sendAnnotationData(postData, "update");
  };

  const onAnnotationDeleted = async (annotation) => {
    const postData = formatAnnotationData(annotation);
    await sendAnnotationData(postData, "delete");
  };
*/
  const formatAnnotationData = (annotation) => {
    console.log("annotation start", annotation.start);
    console.log("annotation end", annotation.end);
    console.log("annotation", annotation);
    console.log("source", window.location.href);
    return {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value,
      target: {
        source: window.location.href,
        selector: {
          start: annotation.target.selector[1].start, // Adjust based on your specific requirements
          end: annotation.target.selector[1].end, // Adjust based on your specific requirements
        },
      },
    };
  };

  const sendAnnotationData = async (data, method) => {
    try {
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/post/${threadId}`;
      console.log(url);
      const response = await axios.post(url, data);
      console.log(`Annotation ${method}d:`, response.data);
    } catch (error) {
      console.error(`Error ${method}ing annotation:`, error);
    }
  };

  const displayAnnotations = (annotations) => {
    // Assuming 'annotations' is an array of annotation objects
    // and you have an instance of Recogito called 'annotator'
    if (annotatorRef.current) {
      annotations.forEach((annotation) => {
        console.log("annotator annotation", annotation);
        annotatorRef.current.addAnnotation({
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

  const fetchAnnotations = async () => {
    try {
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/post/${threadId}`;
      const response = await axios.get(url);

      console.log(response.data);
      if (response.data) {
        // Process and display annotations
        displayAnnotations(response.data);
      }
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API_URL}/user/info`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Replace userAccessToken with the actual user's access token
              "Content-Type": "application/json",
            },
          },
        );

        setCurrentUserId(response.data.id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserId();
    //console.log("fetching annotation?");
  }, []);

  const annotatorRef = useRef(null);

  useEffect(() => {
    annotatorRef.current = new Recogito({
      content: `content-element-${threadId}`,
      // Other initialization...
    });

    fetchAnnotations();
    annotatorRef.current.on("createAnnotation", onAnnotationCreated);

    return () => annotatorRef.current.destroy();
  }, []);

  const formatImageAnnotationData = (annotation, index) => {
    console.log("ımage", annotation);
    // Assuming annotation.target is defined and has the necessary properties
    // Adjust according to the actual structure of the annotation object
    return {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value,

      target: {
        source: JSON.parse(contentImg[index]).url, // Assuming this is the URL of the image
        selector: {
          start: "#" + annotation.target.selector.value,
          end: null,
        },
      },
    };
  };

  const sendImageAnnotationData = async (data, method) => {
    try {
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/post/${threadId}`;
      let response;

      response = await axios.post(url, data);

      console.log(`Annotation ${method}d:`, response.data);
    } catch (error) {
      console.error(`Error ${method}ing annotation:`, error);
    }
  };

  const handleClick = (userId) => {
    navigate(`/profile-page/${userId}`);
  };

  const handleLikeClick = async () => {
    try {
      if (!accessToken) {
        // Handle case where access token is not available
        // You might want to redirect the user to login or handle this case as needed
        return;
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/post/like/${threadId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // You might need to adjust this based on your API requirements
          },
          // Additional body if required
        },
      );

      if (response.ok) {
        if (disliked) {
          setDisliked(false);
          setLiked(true);
          setDislikes(dislikes - 1);
          setLikes(likes + 1);
        } else if (liked) {
          setLiked(false);
          setLikes(likes - 1);
        } else {
          setLikes(likes + 1);
          setLiked(true);
        }
      } else {
        // Handle other status codes, e.g., unauthorized access
        // You might want to show an error message or handle it appropriately
        console.error("Failed to like the post:", response.status);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error liking the post:", error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (!accessToken) {
        // Handle case where access token is not available
        // You might want to redirect the user to login or handle this case as needed
        return;
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/post/dislike/${threadId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // You might need to adjust this based on your API requirements
          },
          // Additional body if required
        },
      );

      if (response.ok) {
        if (liked) {
          setLiked(false);
          setDisliked(true);
          setLikes(likes - 1);
          setDislikes(dislikes + 1);
        } else if (disliked) {
          setDisliked(false);
          setDislikes(dislikes - 1);
        } else {
          setDislikes(dislikes + 1);
          setDisliked(true);
        }
      } else {
        // Handle other status codes, e.g., unauthorized access
        // You might want to show an error message or handle it appropriately
        console.error("Failed to dislike the post:", response.status);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error disliking the post:", error);
    }
  };

  const handleMoreHorizClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditThread = () => {
    navigate(`/edit-thread/${threadId}`);
  };

  const handleDeleteThread = async () => {
    try {
      if (!accessToken) {
        // Handle case where access token is not available
        // You might want to redirect the user to login or handle this case as needed
        return;
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/post/${threadId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        navigate("/forums");
      } else {
        // Handle other status codes, e.g., unauthorized access or error in deletion
        console.error("Failed to delete the post:", response.status);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error deleting the post:", error);
    }
  };

  const isOwner = currentUserId === userId;

  function isValidJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div>
      <script src="/annotorious.min.js"></script>

      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          border: "8px solid rgb(255,255,255)", // Blue border
          borderRadius: "10px", // Rounded corners
          boxShadow: "rgb(255 252 252) 0px 4px 8px",
        }}
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(200,200,200,0.6)",
            padding: "5px",
            maxWidth: "300px",
            width: "100%",
            //borderBottomLeftRadius: "10px",
            //borderTopLeftRadius: "10px",
            paddingTop: "20px",
          }}
        >
          <Box
            component="img"
            onClick={() => handleClick(userId)}
            style={{ cursor: "pointer" }}
            sx={{
              height: 96,
              width: 96,
              borderRadius: "50%",
              alignSelf: "center",
              paddingBottom: "10px",
            }}
            src={
              imgsrc ||
              "https://p7.hiclipart.com/preview/173/464/909/clip-art-pokeball-png.jpg"
            }
          />
          <Typography
            variant="subtitle1"
            component="div"
            onClick={() => handleClick(userId)}
            style={{
              color: "white",
              marginTop: "3px",
              cursor: "pointer",
            }}
          >
            @{username}
          </Typography>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            backgroundColor: "rgb(255,255,255,0.6)",
            padding: "5px",
            maxWidth: "620px",
            width: "100%",
            //borderBottomRightRadius: "10px",
            //borderTopRightRadius: "10px",
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "20px",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
                marginRight: "10px",
                display: "flex",
                marginLeft: "10px",
                marginBottom: "10px",
              }}
            >
              {date}
            </Typography>
            {isOwner && (
              <>
                <IconButton
                  style={{ color: "rgb(255, 255, 255)", cursor: "pointer" }}
                  onClick={handleClick2}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDeleteThread}>
                    Delete Thread
                  </MenuItem>
                  <MenuItem onClick={handleEditThread}>Edit Thread</MenuItem>
                  {/* You can add more options here as needed */}
                </Menu>
              </>
            )}
          </Grid>
          {contentImg && contentImg.length > 0 && (
            <Grid container spacing={2} justifyContent="center">
              {contentImg.map((imgSrc, index) => {
                if (isValidJson(imgSrc)) {
                  const parsedSrc = JSON.parse(imgSrc);
                  const imageId = `image-${index}`;

                  // Initialize Annotorious for each image after rendering
                  useEffect(() => {
                    console.log("burada");
                    const anno = new Annotorious({
                      image: document.getElementById(imageId),
                      widgets: ["COMMENT"],
                      readOnly: false,
                    });

                    anno.on("createAnnotation", async (annotation) => {
                      // Handle annotation creation
                      const formattedData = formatImageAnnotationData(
                        annotation,
                        index,
                      );
                      console.log(formattedData);
                      //await sendImageAnnotationData(formattedData, "create");
                    });
                  }, []); // Empty dependency array ensures this runs once after rendering

                  return (
                    <Grid item key={index}>
                      <img
                        id={imageId} // Unique ID for each image
                        style={{
                          maxHeight: "400px",
                          maxWidth: "610px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                        src={parsedSrc.url}
                        alt={`Image ${index + 1}`}
                      />
                    </Grid>
                  );
                } else {
                  return null; // Return null if the image source is not valid
                }
              })}
            </Grid>
          )}

          <Typography
            variant="body2"
            component="p"
            id={`content-element-${threadId}`} // This ID should match the one used in Recogito initialization
            style={{
              color: "white",
              marginTop: "3px",
              marginRight: "10px",
              //display: "flex",
              marginLeft: "10px",
              textAlign: "left",
              lineHeight: "1.7",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            {content}
          </Typography>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: "560px",
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
                gap: "15px",
                justifyContent: "flex-end",
                marginRight: "20px",
              }}
            >
              <Button
                variant="contained"
                style={upVoteButton}
                onClick={handleLikeClick}
              >
                <ThumbUpIcon
                  style={{ color: liked ? "#008000" : "rgb(255, 255, 255)" }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="left"
                  style={{
                    color: "rgb(255, 255, 255)",
                    marginLeft: "5px",
                  }}
                >
                  {likes}
                </Typography>
              </Button>

              <Button
                variant="contained"
                style={downVoteButton}
                onClick={handleDislikeClick}
              >
                <ThumbDownAltIcon
                  style={{ color: disliked ? "#d20d0d" : "rgb(255, 255, 255)" }}
                />

                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="left"
                  style={{
                    color: "rgb(255, 255, 255)",
                    marginLeft: "5px",
                  }}
                >
                  {dislikes}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ThreadComponent;
