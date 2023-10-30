import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import Post from "../components/Post.js";

function HomePage() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuth(true);
    }
  }, []);
  const boxesData = [
    {
      userName: "@MysticGamer42",
      forum: "Red Dead Redemption 2",
      header: "Flickering Texture Bug",
      description:
        "Some players are experiencing flickering textures in certain areas of the game world. This is a longer description that goes into more detail about the issue. It discusses where the problem occurs, its potential impact on gameplay, and possible workarounds or solutions.",
      tags: ["Action-Adventure", "Texture Bug"],
      timestamp: "2023-10-30 09:15:00",
      numberOfComments: 27,
    },
    {
      userName: "@CyberNinja2077",
      forum: "Cyberpunk 2077",
      header: "Frame Rate Drops",
      description:
        "Players have reported frame rate drops during combat sequences and crowded areas. The frame rate drop issue has been discussed extensively in the gaming community, and there are ongoing efforts to address it through game updates and optimizations.",
      tags: ["Open World", "Performance Issues", "FPS"],
      timestamp: "2023-10-30 09:30:00",
      numberOfComments: 15,
    },
    {
      userName: "@ZeldaExplorer88",
      forum: "The Legend of Zelda: Breath of the Wild",
      header: "Save File Corruption",
      description:
        "A few players have encountered save file corruption issues, leading to lost progress. This description provides insights into the nature of the problem and potential steps players can take to prevent save file corruption.",
      tags: ["Action-Adventure", "Save File", "Progress Loss"],
      timestamp: "2023-10-30 09:45:00",
      numberOfComments: 8,
    },
    {
      userName: "@FortniteFanatic123",
      forum: "Fortnite",
      header: "Login Problems",
      description:
        "Users are having difficulty logging into their accounts and accessing the game. This issue is causing frustration among the player base, and players are seeking support and solutions from the community.",
      tags: ["Battle Royale", "Login Issues", "Account Access"],
      timestamp: "2023-10-30 10:00:00",
      numberOfComments: 42,
    },
    {
      userName: "@CraftyMiner99",
      forum: "Minecraft",
      header: "Crash on Startup",
      description:
        "Some players are facing crashes when they try to launch the game. This description delves into possible causes for the startup crashes and offers troubleshooting tips for affected players.",
      tags: ["Sandbox", "Startup Crashes", "Troubleshooting"],
      timestamp: "2023-10-30 10:15:00",
      numberOfComments: 5,
    },
    {
      userName: "@HeroBalancer76",
      forum: "Overwatch",
      header: "Overpowered Hero Balance",
      description:
        "Discussion on potential balance issues with certain heroes. Players are providing feedback on hero performance and suggesting adjustments to ensure a fair and enjoyable gameplay experience.",
      tags: ["First-Person Shooter", "Hero Balance", "Gameplay Experience"],
      timestamp: "2023-10-30 10:30:00",
      numberOfComments: 18,
    },
    {
      userName: "@ApexSharpshooter",
      forum: "Apex Legends",
      header: "Weapon Imbalance",
      description:
        "Community feedback regarding weapon balance and performance in the game. This detailed description covers the specific weapons in question, their impact on gameplay, and suggestions for rebalancing.",
      tags: ["Battle Royale", "Weapon Balance", "Community Feedback"],
      timestamp: "2023-10-30 10:45:00",
      numberOfComments: 12,
    },
    {
      userName: "@LagSlayer21",
      forum: "League of Legends",
      header: "Server Lag",
      description:
        "Players are experiencing high ping and server lag during matches. This description highlights the impact of server lag on gameplay and ongoing efforts to improve server performance.",
      tags: ["MOBA", "Server Lag", "Ping Issues"],
      timestamp: "2023-10-30 11:00:00",
      numberOfComments: 21,
    },
    {
      userName: "@SneakyImposter",
      forum: "Among Us",
      header: "Hacker Reports",
      description:
        "Discussion on how to deal with hackers and cheaters in the game. The description explores the impact of hackers on gameplay integrity and community efforts to report and address cheating.",
      tags: ["Social Deduction", "Hacker Reports", "Cheating Prevention"],
      timestamp: "2023-10-30 11:15:00",
      numberOfComments: 35,
    },
    {
      userName: "@QuestMaster55",
      forum: "World of Warcraft",
      header: "Quest Bug",
      description:
        "A specific quest is not working correctly, preventing players from completing it. This description outlines the affected quest, its objectives, and potential workarounds or fixes.",
      tags: ["MMORPG", "Quest Bug", "Objective Completion"],
      timestamp: "2023-10-30 11:30:00",
      numberOfComments: 9,
    },
];



  useEffect(() => {}, []);

  return (
    <Container
      style={{ backgroundColor: "rgb(0, 150, 255)", maxWidth: "900px" }}
    >
      <Grid container spacing={1}>
        {boxesData.map((data, index) => (
          <Post post={data} key={index} showButtons={auth}/>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
