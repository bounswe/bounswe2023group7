import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ userLoggedIn, onSettingsClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        style={{
          width: "75%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <InputBase
            placeholder="Search..."
            endAdornment={<SearchIcon />}
            style={{
              backgroundColor: "white",
              flex: 1,
              marginLeft: "250px",
              marginRight: "100px",
              alignItems: "center",
              borderRadius: "20px",
              width: "500px",
            }}
          />
        </div>
        <div>
          {userLoggedIn ? (
            <>
              <div style={{ marginLeft: "250px" }}>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  style={{ color: "white" }} // Make the Settings icon white
                >
                  <SettingsIcon />
                </IconButton>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => onSettingsClick()}>
                  Go to Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to="/login">Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                marginLeft: "200px",
              }}
            >
              <Button
                style={{
                  width: "90px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "black",
                  fontFamily: "OCR A Std, monospace",
                  fontWeight: "bold",
                  marginRight: "10px", // Add margin to separate the buttons
                }}
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
              <Button
                style={{
                  width: "90px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "black",
                  fontFamily: "OCR A Std, monospace",
                  fontWeight: "bold",
                }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
