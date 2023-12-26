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
  Button,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Groups";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
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

const menuItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(50, 150, 30)",
  color: "white",
  borderRadius: "10px",
  padding: "10px",
  margin: "10px",
};

function Sidebar({ userLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleMenuOpen = (event) => {
    setMenuOpen(true);
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl2(null);
  };

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
      navigate("/signup");
    }
    setMenuOpen(false);
    setAnchorEl2(null);
  };

  const handleCreateThreadClick = () => {
    if (userLoggedIn) {
      // If the user is logged in, redirect to the create game page
      navigate("/create-thread");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/signup");
    }
    setMenuOpen(false);
    setAnchorEl2(null);
  };

  const handleCreateGroupClick = () => {
    if (userLoggedIn) {
      // If the user is logged in, redirect to the create game page
      navigate("/create-group");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/signup");
    }
    setMenuOpen(false);
    setAnchorEl2(null);
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
  }
  const menuStyle = {
    position: "absolute",
    width: "400px", // Adjust the width as needed
    //maxHeight: "300px", // Adjust the max height as needed
    borderRadius: "10px",
    padding: "15px",
    //top: "50%", // Position at 50% from the top
    //left: "50%", // Position at 50% from the left
    transform: "translate(130%, -50%)", // Center the menu
  };

  return (
    <div style={rootSx}>
      <Drawer style={drawer} variant="permanent">
        <Paper style={drawerPaper}>
          <List>
            <ListItem Button component={Link} to="/">
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
            <ListItem Button component={Link} to="/games">
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
            <ListItem Button component={Link} to="/groups">
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
            <ListItem Button component={Link} to="/forums">
              <div>
                <ListItemIcon style={listItem}>
                  <div style={circleIcon}>
                    <ForumIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Forums"
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
            <ListItem
              Button
              //onClick={handleCreateGameClick}
              style={{ cursor: "pointer" }}
            >
              <div>
                <ListItemIcon style={listItem} onClick={handleMenuOpen}>
                  <div style={circleIcon}>
                    <AddCircleIcon />
                  </div>
                  <Stack direction="column" alignItems="center">
                    <ListItemText
                      primary="Create"
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

                <Menu
                  anchorEl={anchorEl2}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  PaperComponent={Paper}
                  PaperProps={{
                    style: menuStyle, // Applying styles to the Paper component
                  }}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  <MenuItem
                    onClick={handleCreateThreadClick}
                    style={menuItemStyle}
                  >
                    Create Thread
                  </MenuItem>
                  <MenuItem
                    onClick={handleCreateGameClick}
                    style={menuItemStyle}
                  >
                    Create Game
                  </MenuItem>
                  <MenuItem
                    onClick={handleCreateGroupClick}
                    style={menuItemStyle}
                  >
                    Create Group
                  </MenuItem>
                </Menu>

                {/* You can apply a darkened background behind the menu by using an overlay */}
                {menuOpen && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity for darkness
                      zIndex: 999, // Ensure it's above other elements
                    }}
                    onClick={handleMenuClose} // Close the menu if clicked outside
                  />
                )}
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
