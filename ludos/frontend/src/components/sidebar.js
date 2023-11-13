import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Paper,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Groups";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const drawerWidth = 90;

const rootSx = {
  display: "flex",
};

const drawer = {
  width: drawerWidth,
  flexShrink: 0,
};

const drawerPaper = {
  width: drawerWidth,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 0,
  backgroundColor: "#F49A32",
};

const listItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 1,
};

const circleIcon = {
  marginTop: "auto",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  width: "3rem",
  height: "3rem",
};

function Sidebar({ userLoggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGameClick = () => {
    if (userLoggedIn) {
      // If the user is logged in, redirect to the create game page
      navigate("/create-game");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
  }

  return (
    <div style={rootSx}>
      <Drawer style={drawer} variant="permanent">
        <Paper style={drawerPaper}>
          <List>
            <ListItem button component={Link} to="/">
              <div>
                <ListItemIcon style={listItem}>
                  <div style={circleIcon}>
                    <HomeIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Home"
                      primaryTypographyProps={{
                        style: {
                          fontSize: "15px",
                          fontFamily: "OCR A Std, monospace",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Stack>
                </ListItemIcon>
              </div>
            </ListItem>
            <ListItem button component={Link} to="/games">
              <div>
                <ListItemIcon style={listItem}>
                  <div style={circleIcon}>
                    <SportsEsportsIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Games"
                      primaryTypographyProps={{
                        style: {
                          fontSize: "15px",
                          fontFamily: "OCR A Std, monospace",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Stack>
                </ListItemIcon>
              </div>
            </ListItem>
            <ListItem button component={Link} to="/groups">
              <div>
                <ListItemIcon style={listItem}>
                  <div style={circleIcon}>
                    <GroupIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Groups"
                      primaryTypographyProps={{
                        style: {
                          fontSize: "15px",
                          fontFamily: "OCR A Std, monospace",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Stack>
                </ListItemIcon>
              </div>
            </ListItem>
            <ListItem button onClick={handleCreateGameClick}>
              <div>
                <ListItemIcon style={listItem}>
                  <div style={circleIcon}>
                    <AddCircleIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Create Game"
                      primaryTypographyProps={{
                        style: {
                          fontSize: "15px",
                          fontFamily: "OCR A Std, monospace",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Stack>
                </ListItemIcon>
              </div>
            </ListItem>
          </List>

          {/* Profile Button */}
          <IconButton
            onClick={handleProfileClick}
            style={{
              marginTop: "auto",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Profile Menu (conditional rendering based on userLoggedIn) */}
          {userLoggedIn ? (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem
                component={Link}
                to="/profile-page"
                onClick={handleProfileClose}
              >
                Profile Page
              </MenuItem>
              <MenuItem
                component={Link}
                to="/change-password"
                onClick={handleProfileClose}
              >
                Change Password
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleLogout}>
                Log Out
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleProfileClose}
              >
                Sign In
              </MenuItem>
              <MenuItem
                component={Link}
                to="/signup"
                onClick={handleProfileClose}
              >
                Register
              </MenuItem>
            </Menu>
          )}
        </Paper>
      </Drawer>
    </div>
  );
}

export default Sidebar;
