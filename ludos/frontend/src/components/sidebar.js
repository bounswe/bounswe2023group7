import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Groups';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const drawerWidth = 105; // Adjust the width as needed

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#F49A32',
    display: 'flex',
    flexDirection: 'column', // Display items in a column
    alignItems: 'center', // Center items horizontally
    paddingTop: theme.spacing(0), // Add top padding
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column', // Display icon and text in a column
    alignItems: 'center', // Center icon and text horizontally
    padding: theme.spacing(1),
  },
  circleIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  smallText: {
    fontSize: '6px', // Adjust the font size as needed
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemIcon className={classes.listItem} style={{ textAlign: 'center' }}>
                <div className={classes.circleIcon}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <HomeIcon />
                  </div>
                </div>
                <ListItemText primary={<span style={{ fontSize: '15px', textAlign: 'center', fontFamily: 'OCR A Std, monospace', fontWeight: 'bold' }}>Home</span>} />
              </ListItemIcon>
            </div>
          </ListItem>
          <ListItem button component={Link} to="/games">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemIcon className={classes.listItem} style={{ textAlign: 'center' }}>
                <div className={classes.circleIcon}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SportsEsportsIcon />
                  </div>
                </div>
                <ListItemText primary={<span style={{ fontSize: '15px', textAlign: 'center', fontFamily: 'OCR A Std, monospace', fontWeight: 'bold' }}>Games</span>} />
              </ListItemIcon>
            </div>
          </ListItem>
          <ListItem button component={Link} to="/groups">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemIcon className={classes.listItem} style={{ textAlign: 'center' }}>
                <div className={classes.circleIcon}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GroupIcon />
                  </div>
                </div>
                <ListItemText primary={<span style={{ fontSize: '15px', textAlign: 'center', fontFamily: 'OCR A Std, monospace', fontWeight: 'bold' }}>Groups</span>} />
              </ListItemIcon>
            </div>
          </ListItem>
          <ListItem button component={Link} to="/create-game">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemIcon className={classes.listItem} style={{ textAlign: 'center' }}>
                <div className={classes.circleIcon}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddCircleIcon />
                  </div>
                </div>
                <ListItemText primary={<span style={{ fontSize: '15px', textAlign: 'center', fontFamily: 'OCR A Std, monospace', fontWeight: 'bold' }}>Create Game</span>} />
              </ListItemIcon>
            </div>
          </ListItem>
        </List>

        {/* Profile Button */}
      
        <IconButton
          onClick={handleProfileClick}
          style={{
            marginTop: 'auto',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            width: '3rem', // Set the desired width
            height: '3rem', // Set the desired height
          }}
        >
          <AccountCircleIcon />
        </IconButton>
      
        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem component={Link} to="/profile-page" onClick={handleProfileClose}>
            Profile Page
          </MenuItem>
          <MenuItem component={Link} to="/change-password" onClick={handleProfileClose}>
            Change Password
          </MenuItem>
          <MenuItem component={Link} to="/log-out" onClick={handleProfileClose}>
            Log Out
          </MenuItem>

        </Menu>
      </Drawer>
     
    </div>
  );
}

export default Sidebar;
