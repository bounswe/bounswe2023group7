import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function HomePage() {
  const boxesData = [
    {
      forum: 'Red Dead Redemption 2',
      header: 'Flickering Texture Bug',
      description: 'Some players are experiencing flickering textures in certain areas of the game world. This is a longer description that goes into more detail about the issue. It discusses where the problem occurs, its potential impact on gameplay, and possible workarounds or solutions.',
      tags: ['Action-Adventure', 'Texture Bug']
    },
    {
      forum: 'Cyberpunk 2077',
      header: 'Frame Rate Drops',
      description: 'Players have reported frame rate drops during combat sequences and crowded areas. The frame rate drop issue has been discussed extensively in the gaming community, and there are ongoing efforts to address it through game updates and optimizations.',
      tags: ['Open World', 'Performance Issues', 'FPS']
    },
    {
      forum: 'The Legend of Zelda: Breath of the Wild',
      header: 'Save File Corruption',
      description: 'A few players have encountered save file corruption issues, leading to lost progress. This description provides insights into the nature of the problem and potential steps players can take to prevent save file corruption.',
      tags: ['Action-Adventure', 'Save File', 'Progress Loss']
    },
    {
      forum: 'Fortnite',
      header: 'Login Problems',
      description: 'Users are having difficulty logging into their accounts and accessing the game. This issue is causing frustration among the player base, and players are seeking support and solutions from the community.',
      tags: ['Battle Royale', 'Login Issues', 'Account Access']
    },
    {
      forum: 'Minecraft',
      header: 'Crash on Startup',
      description: 'Some players are facing crashes when they try to launch the game. This description delves into possible causes for the startup crashes and offers troubleshooting tips for affected players.',
      tags: ['Sandbox', 'Startup Crashes', 'Troubleshooting']
    },
    {
      forum: 'Overwatch',
      header: 'Overpowered Hero Balance',
      description: 'Discussion on potential balance issues with certain heroes. Players are providing feedback on hero performance and suggesting adjustments to ensure a fair and enjoyable gameplay experience.',
      tags: ['First-Person Shooter', 'Hero Balance', 'Gameplay Experience']
    },
    {
      forum: 'Apex Legends',
      header: 'Weapon Imbalance',
      description: 'Community feedback regarding weapon balance and performance in the game. This detailed description covers the specific weapons in question, their impact on gameplay, and suggestions for rebalancing.',
      tags: ['Battle Royale', 'Weapon Balance', 'Community Feedback']
    },
    {
      forum: 'League of Legends',
      header: 'Server Lag',
      description: 'Players are experiencing high ping and server lag during matches. This description highlights the impact of server lag on gameplay and ongoing efforts to improve server performance.',
      tags: ['MOBA', 'Server Lag', 'Ping Issues']
    },
    {
      forum: 'Among Us',
      header: 'Hacker Reports',
      description: 'Discussion on how to deal with hackers and cheaters in the game. The description explores the impact of hackers on gameplay integrity and community efforts to report and address cheating.',
      tags: ['Social Deduction', 'Hacker Reports', 'Cheating Prevention']
    },
    {
      forum: 'World of Warcraft',
      header: 'Quest Bug',
      description: 'A specific quest is not working correctly, preventing players from completing it. This description outlines the affected quest, its objectives, and potential workarounds or fixes.',
      tags: ['MMORPG', 'Quest Bug', 'Objective Completion']
    },
  ];



  const boxStyle = { backgroundColor: 'rgba(30, 30, 30, 0.9)', borderRadius: '10px', paddingTop: '15px' }
  const headerStyle = {
    color: 'white',
    fontFamily: 'Trebuchet MS, sans-serif',
    marginBottom: '10px'
  }
  const forumStyle = { color: 'rgb(0, 150, 255)' }
  const followButton = { backgroundColor: 'rgb(255, 165, 0)', color: 'rgb(0, 0, 0)', height: '20px', textTransform: 'none' }
  const descriptionStyle = { color: 'white' }
  const tagBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 150, 255)',
    color: 'white',
    height: '6px',
    borderRadius: '10px',
    padding: '5px',
    marginRight: '5px',
  };
  const upVoteButton = { backgroundColor: 'rgb(124, 252, 0)', marginRight: '5px'};
  const downVoteButton = { backgroundColor: 'rgb(222, 49, 99)' };

  useEffect(() => { 


  }, []);

  return (
    <Container style={{ backgroundColor: 'rgb(0, 150, 255)', maxWidth: '900px'}}>
      <Grid container spacing={1} >
        {boxesData.map((data, index) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={index} >
            <Box p={5} style={boxStyle}>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" component="div" style={forumStyle}>
                  {data.forum}
                </Typography>
                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {data.tags.map((data1, index1) => (
                    <Typography variant="caption" component="div" style={tagBox} key={index1}>
                      {data1}
                    </Typography>
                  ))}
                  <Button variant="contained" style={followButton}>
                    Follow
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="h4" component="div" textAlign='left' style={headerStyle} >
                {data.header}
              </Typography>
              <Typography variant="body2" color="textSecondary" textAlign='left' style={descriptionStyle}>
                {data.description}
              </Typography>
              <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop:'10px'}}>
              <Button variant="contained" style={upVoteButton} >
                <FaArrowUp style={{ color: 'black' }}/> 
              </Button>
              <Button variant="contained" style={downVoteButton}>
                <FaArrowDown /> 
              </Button>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
