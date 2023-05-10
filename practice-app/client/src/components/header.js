import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #333333, #090513)' }}>
      <Toolbar>
      <Button color="inherit" component={Link} to="/">
          <HomeIcon />
        </Button>
      <Button color="inherit" onClick={toggleSidebar}>
          Contributors
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          CMPE 352 SPRING 2023 GROUP 7
        </Typography>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
        <Button color="inherit" component={Link} to="/signin">
          Sign In
        </Button>
        <Button color="inherit" href="https://github.com/bounswe/bounswe2023group7" target="_blank" rel="noopener">
          <GitHubIcon />
        </Button>
       
      </Toolbar>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar} >
        <List>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Elif-K%C4%B1z%C4%B1lkaya">
            <ListItemText primary="Elif Kızılkaya" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Melih-Gezer">
            <ListItemText primary="Melih Gezer" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Yunus-Emre-Altu%C4%9F">
            <ListItemText primary="Yunus Emre Altuğ" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Furkan-%C3%9Clke">
            <ListItemText primary="Furkan Ülke" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Muhammet-Tayyip-Kamilo%C4%9Flu">
            <ListItemText primary="Muhammet Tayyip Kamiloğlu" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Fatma-Sena-Al%C3%A7%C4%B1">
            <ListItemText primary="Fatma Sena Alçı" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/%C3%96mer-%C5%9Eafak-Bebek">
            <ListItemText primary="Ömer Şafak Bebek" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/G%C3%BCney-Y%C3%BCksel">
            <ListItemText primary="Güney Yüksel" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Yunus-Emre-Altu%C4%9F">
            <ListItemText primary="Mehmet Tuluyhan Sözen" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Hakan-Karaku%C5%9F">
            <ListItemText primary="Hakan Karakuş" />
          </ListItem>
          <ListItem sx = {{color: '#000000'}} component="a" href="https://github.com/bounswe/bounswe2023group7/wiki/Marcel">
            <ListItemText primary="Marcel Namyslo" />
          </ListItem>
          {}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;