import React, { useState, useEffect } from "react";
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
                <MenuItem onClick={handleDeleteThread}>Delete Thread</MenuItem>
                {/* <MenuItem onClick={handleUpdateThread}>Update Thread</MenuItem>*/}
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
          style={{
            color: "white",
            marginTop: "3px",
            marginRight: "10px",
            display: "flex",
            marginLeft: "10px",
            textAlign: "left",
            lineHeight: "1.7",
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
  );
}

export default ThreadComponent;
