import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Recogito } from "@recogito/recogito-js";
import "@recogito/recogito-js/dist/recogito.min.css";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import ReplyIcon from "@mui/icons-material/Reply";

function CommentComponent({
  imgsrc,
  contentImg,
  username,
  date,
  content,
  userId,
  commentId,
  isLiked,
  isDisliked,
  likeCount,
  dislikeCount,
  likedUsers,
  dislikedUsers,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [contentText, setContentText] = useState(content);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    //setEditing(false);
  };
  const navigate = useNavigate();
  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(dislikeCount);
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editContent, setEditContent] = useState(content);
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

  const handleClick = (userId) => {
    navigate(`/profile-page/${userId}`);
  };

  const formatAnnotationData = (annotation) => {
    console.log("annotation start", annotation.start);
    console.log("annotation end", annotation.end);
    console.log("annotation", annotation);
    console.log("source", window.location.href);
    console.log("??????????");
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
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/comment/${commentId}`;
      console.log(url);
      const response = await axios.post(url, data);
      console.log(`Annotation ${method}d:`, response.data);
    } catch (error) {
      console.error(`Error ${method}ing annotation:`, error);
    }
  };

  const onAnnotationCreated = async (annotation) => {
    const postData = formatAnnotationData(annotation);
    await sendAnnotationData(postData, "create");
  };

  const onAnnotationDeleted = async (annotation) => {
    console.log("delete annotation", annotation);
    const id = annotation.id;
    //const postData = formatAnnotationData(annotation);
    await deleteAnnotationData(id);
  };

  const parseId = (id) => {
    const parts = id.split("/");
    return {
      source: parts[0],
      type: parts[1],
      itemId: parts[2],
      date: parts[3],
    };
  };

  const deleteAnnotationData = async (id) => {
    try {
      const { source, type, itemId, date } = parseId(id);
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/${source}/${type}/${itemId}/${date}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Make sure accessToken is defined and valid
        },
      });

      console.log("Annotation deleted:", response.data);
    } catch (error) {
      console.error("Error deleting annotation:", error);
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
      const url = `http://${process.env.REACT_APP_API_URL}/annotation/comment/${commentId}`;
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
  }, []);

  const annotatorRef = useRef(null);
  useEffect(() => {
    // Ensure the element is available in the DOM
    const contentElement = document.getElementById(
      `content-element-${commentId}`,
    );
    console.log("?", contentElement);

    if (contentElement) {
      annotatorRef.current = new Recogito({
        content: `content-element-${commentId}`,
        // Other initialization...
      });

      fetchAnnotations();
      annotatorRef.current.on("createAnnotation", onAnnotationCreated);
      annotatorRef.current.on("deleteAnnotation", onAnnotationDeleted);

      // Cleanup function
      return () => {
        if (annotatorRef.current) {
          annotatorRef.current.destroy();
        }
      };
    }
  }, [commentId]);

  useEffect(() => {
    if (currentUserId) {
      const isLikedTemp = likedUsers.some((user) => user.id === currentUserId);
      const isDislikedTemp = dislikedUsers.some(
        (user) => user.id === currentUserId,
      );

      setLiked(isLikedTemp);
      setDisliked(isDislikedTemp);
      console.log(isLikedTemp);
      console.log(isDislikedTemp);
    }
  }, [currentUserId, likedUsers, dislikedUsers]);

  const handleLikeClick = async () => {
    try {
      if (!accessToken) {
        // Handle case where access token is not available
        // You might want to redirect the user to login or handle this case as needed
        return;
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/comment/${commentId}/like-comment`,
        {
          method: "POST",
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
        `http://${process.env.REACT_APP_API_URL}/comment/${commentId}/dislike-comment`,
        {
          method: "POST",
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

  const handleModalOpen = () => {
    setEditContent(content);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleMoreHorizClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDeleteComment = async () => {
    try {
      if (!accessToken) {
        // Handle case where access token is not available
        // You might want to redirect the user to login or handle this case as needed
        return;
      }

      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/comment/${commentId}/delete-comment`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        window.location.reload();
      } else {
        // Handle other status codes, e.g., unauthorized access or error in deletion
        console.error("Failed to delete the comment:", response.status);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error deleting the comment:", error);
    }
  };

  const handleUpdate = () => {
    handleModalOpen();
    handleClose();
  };

  const handleUpdateComment = async () => {
    try {
      const response = await axios.put(
        `http://${process.env.REACT_APP_API_URL}/comment/${commentId}/edit-comment`,
        {
          newText: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status == 200) {
        setEditing(false);
        setContentText(editContent);
        handleModalClose(); // Close the modal after updating
        window.location.reload();
      } else {
        console.error("Failed to update the comment:", response.status);
      }
    } catch (error) {
      console.error("Error updating the comment:", error);
    }
  };

  const isOwner = currentUserId === userId;

  return (
    <Grid style={{ display: "flex", flexDirection: "row" }}>
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(200,200,200,0.6)",
          padding: "5px",
          maxWidth: "300px",
          width: "100%",
          borderBottomLeftRadius: "10px",
          borderTopLeftRadius: "10px",
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
          borderBottomRightRadius: "10px",
          borderTopRightRadius: "10px",
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
                <MenuItem onClick={handleDeleteComment}>
                  Delete Comment
                </MenuItem>
                <MenuItem onClick={handleUpdate}>Edit Comment</MenuItem>
                {/* You can add more options here as needed */}
              </Menu>
            </>
          )}
        </Grid>
        {contentImg && contentImg.length > 0 && (
          <Grid container spacing={2} justifyContent="center">
            {contentImg.map((imgSrc, index) => (
              <Grid item key={index}>
                <img
                  style={{
                    maxHeight: "400px",
                    maxWidth: "610px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                  src={imgSrc}
                  alt={`Image ${index + 1}`}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Typography
          variant="body2"
          component="div"
          id={`content-element-${commentId}`}
          style={{
            color: "white",
            marginTop: "3px",
            marginRight: "10px",
            marginLeft: "10px",
            textAlign: "left",
            lineHeight: "1.7",
          }}
        >
          {contentText}
        </Typography>

        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can edit your comment here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Edit Comment"
              type="text"
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={handleUpdateComment}>Edit</Button>
          </DialogActions>
        </Dialog>
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
  );
}

export default CommentComponent;
