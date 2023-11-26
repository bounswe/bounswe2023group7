import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import MyGamesIcon from "../assets/my_games.png";
import MyGroupsIcon from "../assets/my_groups.png";

const Header = ({ userLoggedIn }) => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

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
        <a href="/">
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        </a>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: "1",
                  justifyContent: "center",
                  marginLeft: "160px", // Adjust the left margin as needed
                }}
              >
                <Link
                  to="/myGames"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div>
                    <img
                      src={MyGamesIcon}
                      alt="MyGames"
                      style={{ width: "auto", height: "50px" }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        margin: "0",
                        fontSize: "12px",
                        width: "60px",
                      }}
                    >
                      My Games
                    </p>
                  </div>
                </Link>
                <Link
                  to="/myGroups"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ marginLeft: "50px" }}>
                    <img
                      src={MyGroupsIcon}
                      alt="MyGroups"
                      style={{
                        width: "auto",
                        height: "50px",
                      }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        margin: "0",
                        fontSize: "12px",
                        width: "60px",
                      }}
                    >
                      My Groups
                    </p>
                  </div>
                </Link>
              </div>
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
