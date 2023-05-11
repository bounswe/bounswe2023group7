import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PlatformInfo from "./platform_info";

const ListGames = () => {
  
  const location = useLocation();
  const size = location.state.games.length;
  console.log(location.state.games);
  
  const [data, setData] = React.useState([]);


  const handleClick = (id) => {
    const link="http://localhost:8080/api/game-platform/game?id="+id;
    axios
      .get(link, {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5hZ3ppbWl6aW50YWRpa2FjbWFzaW4iLCJpYXQiOjE2ODM2Njc5NTF9.UlqA36kVDfQnisY4kOShD-D0lQFC75huQehOgHMMYvw",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div><>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
        padding: '2rem',
        color: 'dark grey',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          justifyContent: 'center',
        }}
      >
        {location.state.games.map((game, index) => (
        <Button sx={{
          backgroundColor: "#424242",
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          color: '#FFFFFF'
        }} key={index} onClick={() => handleClick(game.game_id)}>{game.title}</Button>
      ))}
      <PlatformInfo data={data} />
      
        


      </Box>
    </Box>
  </></div>
  );
}

export default ListGames;