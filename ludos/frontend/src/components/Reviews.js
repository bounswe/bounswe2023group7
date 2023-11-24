import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import Review from "./Review";
import axios from "axios";

function Reviews(reviews) {
  const [review, setReview] = useState("");
  const [submission, setSubmission] = useState(0);
  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    paddingTop: "15px",
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  useEffect(() => {
    setReview("");
  }, [submission]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reviews);
    const link = `http://${process.env.REACT_APP_API_URL}/review/${reviews.id}/`;
    const formData = {
      rating: 5,
      content: review,
    };
    axios
      .post(link, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setSubmission(submission + 1);
        setReview("");
      })
      .catch((error, request) => {
        console.log(request);
        console.error("Error on making review:", error);
      });
  };

  const userStyle = { color: "rgb(0, 250, 255)", marginRight: "2%" };

  return (
    <Grid>
      {reviews.data.map((review, index1) => (
        <Review review={review} key={index1} showButton={reviews.showButtons} />
      ))}
      {reviews.showButtons && (
        <Box p={5} style={boxStyle}>
          <Typography
            variant="caption"
            component="div"
            textAlign="left"
            style={userStyle}
            value={review}
          >
            Share Your Review
          </Typography>
          <TextField
            id="content"
            multiline
            rows={4}
            value={review}
            onChange={handleChange}
            variant="outlined" // You can choose the variant you prefer
            fullWidth
            InputProps={{
              style: { color: "white" }, // Apply custom styles to the input element
            }}
          />
          <Grid style={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleSubmit} style={{ marginTop: "3%" }}>
              Enter
            </Button>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default Reviews;
