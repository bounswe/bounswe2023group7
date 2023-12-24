import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import MyGamesIcon from "../assets/my_games.png";
import MyGroupsIcon from "../assets/my_groups.png";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupsIcon from '@mui/icons-material/Groups';
import axios from "axios";

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
}


const Header = ({ userLoggedIn }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();


  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
  });

  const searchOptions = (datas) => {
    let options = [];

    if (datas.games) {
      datas.games.map((game) => options.push("Game: " + game.title));
    }
    if (datas.users) {
      datas.users.map((user) => options.push("User: " + user.username));
    }
    if (datas.posts) {
      datas.posts.map((post) => options.push("Thread: " + post.title));
    }
    if (datas.groups) {
      datas.groups.map((group) => options.push("Group: " + group.name));
    }


    return options;
  }

  const handleRoute = (info) => {

    var path = "";

    if (info.includes("Game: ")) {
      info = info.replace("Game: ", "");
      info = convertToSlug(info);
      path = `/game/${info}`;
    }
    else if (info.includes("User: ")) {
      info = info.replace("User: ", "");
      let specUser = datas.users.find((user) => user.username === info);
      path = `/profile-page/${specUser.id}`;
    }
    else if (info.includes("Thread: ")) {
      info = info.replace("Thread: ", "");
      let specPost = datas.posts.find((post) => post.title === info);
      path = `/thread/${specPost.id}`;
    }
    else if (info.includes("Group: ")) {
      info = info.replace("Group: ", "");
      let specGroup = datas.grups.find((group) => group.name === info);
      path = `/group/${specGroup.id}`;
    }
    navigate(path);
    window.location.reload(false);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get(`/search/${searchKey}`)
        .then((response) => {
          console.log(response);
          setDatas(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (searchKey && searchKey.length > 1) {
      fetchData();
    }
  }, [searchKey]);





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
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
        </a>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: "20px",
          }}
        >
          <Autocomplete
            value={searchValue}
            onChange={(event, newValue) => {
              if (newValue && newValue.length > 1) {
                setSearchValue(newValue);
                handleRoute(newValue);
              }
            }}
            options={searchOptions(datas)}
            renderOption={(props, option) => {
              if (option.includes("Game: ")) {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <SportsEsportsIcon />
                    {option.split("Game: ")[1]}
                  </Box>
                );
              } else if (option.includes("User: ")) {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <PersonIcon />
                    {option.split("User: ")[1]}
                  </Box>
                );
              }
              else if (option.includes("Thread: ")) {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <QuestionAnswerIcon margin={5} />
                    {option.split("Thread: ")[1]}
                  </Box>
                );
              }
              else if (option.includes("Group: ")) {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <GroupsIcon margin={5} />
                    {option.split("Group: ")[1]}
                  </Box>
                );
              }

            }}
            onInputChange={(event, newInputValue) => {
              setSearchKey(newInputValue);
            }}
            required
            renderInput={(params) => (
              <TextField
                {...params}
                width="90%"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",

                    legend: {
                      marginLeft: "30px",
                    },
                  },
                  "& .MuiAutocomplete-inputRoot": {
                    paddingLeft: "20px !important",
                    borderRadius: "50px",
                  },
                  "& .MuiInputLabel-outlined": {
                    paddingLeft: "20px",
                  },
                  "& .MuiInputLabel-shrink": {
                    marginLeft: "20px",
                    paddingLeft: "10px",
                    paddingRight: 0,
                    background: "white",
                  },
                }}
              />
            )}
            style={{
              margin: "10px",
              backgroundColor: "white",
              borderRadius: "40px",
              width: "100%",
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
                <a
                  href="/profile-page/#favGamesSection"
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
                </a>
                <a
                  href="/profile-page/#myGroupsSection"
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
                </a>
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
    </AppBar >
  );
};

export default Header;
