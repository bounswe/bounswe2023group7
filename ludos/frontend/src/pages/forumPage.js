import React from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import ForumImage from "../assets/game_console.jpg";
import InputBase from "@mui/material/InputBase";
import { Grid, Container } from "@mui/material";
import Post from "../components/forum_post";

const Forum = () => {
  const boxesData = [
    {
      username: "posted by @Gamer123",
      timestamp: "2 hours ago",
      forum: "Video Game Forum",
      header: "Looking for Hidden Gems!",
      description:
        "Share your favorite underrated video games that deserve more recognition. Tell us about the hidden gems you've discovered on your gaming journey.",
      tags: ["Game Recommendations", "Hidden Gems", "Underrated Games"],
    },
    {
      username: "posted by @JoystickMaster",
      timestamp: "4 hours ago",
      forum: "Video Game Forum",
      header: "My All-Time Favorite: Ellie from The Last of Us",
      description:
        "Let's talk about the video game characters that captured our hearts. I want to express my love for Ellie from The Last of Us and hear about your favorite characters too!",
      tags: ["Character Appreciation", "Ellie", "The Last of Us"],
    },
    {
      username: "posted by @GameFrustration",
      timestamp: "7 hours ago",
      forum: "Video Game Forum",
      header: "What Drives You Crazy in Games?",
      description:
        "Discuss the game mechanics that you find frustrating. Whether it's overly complicated crafting systems or confusing level design, share your gaming pet peeves.",
      tags: ["Game Mechanics", "Frustrating Gameplay", "Pet Peeves"],
    },
    {
      username: "posted by @EpicGamer1",
      timestamp: "10 hours ago",
      forum: "Video Game Forum",
      header: "Epic Moments in Online Battles",
      description:
        "Share your most epic and memorable moments from online multiplayer games. From clutch victories to hilarious mishaps, let's relive those gaming adventures.",
      tags: ["Multiplayer Gaming", "Epic Moments", "Online Battles"],
    },
    {
      username: "posted by @ModdingPro",
      timestamp: "16 hours ago",
      forum: "Video Game Forum",
      header: "Modding Marvels: Transforming Games",
      description:
        "Dive into the world of game modding. Share your experiences with modding tools and the incredible changes you've made to your favorite games.",
      tags: ["Game Modding", "Modding Tools", "Customization"],
    },
    {
      username: "posted by @EasterEggHunter",
      timestamp: "22 hours ago",
      forum: "Video Game Forum",
      header: "Hunting for Easter Eggs!",
      description:
        "Discovering hidden Easter eggs in games is like finding treasures. Share your most interesting and bizarre Easter egg discoveries with the community.",
      tags: ["Easter Eggs", "Secrets", "Hidden Treasures"],
    },
    {
      username: "posted by @CoopGamerX",
      timestamp: "2 days ago",
      forum: "Video Game Forum",
      header: "Co-op Chronicles: Unforgettable Moments",
      description:
        "Celebrate the joy of cooperative gaming. Share your unforgettable co-op experiences, whether you're working together or causing chaos!",
      tags: ["Co-op Gaming", "Memorable Moments", "Teamwork"],
    },
    {
      username: "posted by @AchievementHunter",
      timestamp: "2 days ago",
      forum: "Video Game Forum",
      header: "Proud Moments: Gaming Achievements",
      description:
        "Achieving in-game milestones is a fantastic feeling. Brag about your gaming accomplishments and let's cheer each other on!",
      tags: ["Gaming Achievements", "Milestones", "Accomplishments"],
    },
    {
      username: "posted by @GameCollector22",
      timestamp: "3 days ago",
      forum: "Video Game Forum",
      header: "Collectors' Corner: Show Off Your Trophies",
      description:
        "Are you a game collector? Show us your gaming collections, from vintage cartridges to limited editions. Let's admire each other's treasures.",
      tags: ["Game Collecting", "Gaming Treasures", "Collector's Items"],
    },
    {
      username: "posted by @DesignEnthusiast",
      timestamp: "4 days ago",
      forum: "Video Game Forum",
      header: "Game Design Breakdown: Artistry & Innovation",
      description:
        "Dive deep into the art and design of video games. Discuss the creative and innovative aspects of game design that leave you in awe.",
      tags: ["Game Design", "Artistry", "Innovation"],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        //width: "100%",
      }}
    >
      {/* Forum Picture */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          //padding: "20px",
          height: "100px",
          backgroundColor: "#3C7299",
          width: "100%",
          //borderRadius: "3%",
        }}
      >
        <CardMedia
          component="img"
          alt="Forum Image"
          style={{
            width: "100px",
            height: "auto",
            borderRadius: "50%",
            marginLeft: "80px",
          }}
          image={ForumImage}
        />

        <div style={{ marginLeft: "20px" }}>
          {/* Forum Title */}
          <div
            style={{
              backgroundColor: "#2F5B7A", // Background color for the title box
              display: "inline-block",
              padding: "5px 10px", // Adjust padding as needed
              borderRadius: "10px",
              marginRight: "25px",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              style={{
                color: "white",
                fontFamily: "OCR A Std, monospace", // Set the desired font family
                fontWeight: "bold",
              }}
            >
              Video Games
            </Typography>
          </div>

          {/* Join Button */}
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "white",
              borderRadius: "40px",
              width: "10px",
              height: "30px",
              color: "black",
              fontFamily: "OCR A Std, monospace", // Set the desired font family
              fontWeight: "bold",
            }}
          >
            Join
          </Button>
        </div>
      </div>
      {/* Create a Post Bar */}
      <div
        style={{
          backgroundColor: "white", // Background color for the bar
          display: "inline-block",
          padding: "10px 20px", // Adjust padding as needed
          borderRadius: "10px",
          margin: "20px auto", // Center the bar horizontally
        }}
      >
        <InputBase
          placeholder="Create a Post..."
          style={{
            backgroundColor: "white",
            flex: 1,
            //marginLeft: "250px",
            //marginRight: "100px",
            alignItems: "center",
            borderRadius: "20px",
            width: "870px",
          }}
        />
      </div>
      <Container style={{ backgroundColor: "#3C7299", maxWidth: "900px" }}>
        <Grid container spacing={1}>
          {boxesData.map((data, index) => (
            <Post post={data} key={index} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Forum;
