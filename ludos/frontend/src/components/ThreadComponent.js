import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";

function ThreadComponent({
  imgsrc,
  contentImg,
  username,
  date,
  content,
  userId,
}) {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/profile-page/${userId}`);
  };
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
            <ThumbUpIcon />
            <ThumbDownAltIcon />
            <ReplyIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ThreadComponent;
