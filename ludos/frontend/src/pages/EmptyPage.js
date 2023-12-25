import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function EmptyGamePage() {
  return (
    <>
      <Container
        style={{
          maxWidth: "1200px",
          margin: "162px auto",
          maxHeight: "300px",
        }}
      >
        <Grid container spacing={1}>
          <Box
            p={0}
            style={{
              width: "100%",
              marginTop: "3%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "10px",
            }}
          >
            <Typography
              style={{
                fontSize: "25px",
                color: "white",
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              {
                "The content you are looking for does not exist. You can create the content by clicking on the 'Create' button on the sidebar."
              }
            </Typography>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

export default EmptyGamePage;
