import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import GroupTopic from "../components/GroupTopic";
import GroupsImage from "../assets/Groups.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForumsPage = () => {
  const myComponentRef = useRef(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchGame, setSearchGame] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [joinedOnly, setJoinedOnly] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tags, setTags] = useState([]);
  const [currTag, setCurrTag] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const link1 = `http://${process.env.REACT_APP_API_URL}/user/info`;
      axios
        .get(link1, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          setAuth(true);
        })
        .catch((error) => {
          console.log(error);
          setAuth(false);
        });
    } else {
      setAuth(false);
    }
    const tagsString = tags.join("%2C");
    const link = `http://${process.env.REACT_APP_API_URL}/group?page=${page}&searchKey=${searchInput}&tags=${tagsString}&gameId=${searchGame}&order=${sortOrder}&orderByKey=${sortBy}&isJoined=${joinedOnly}`;
    console.log(link);
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setGroups(response.data.items);
        setPageCount(response.data.meta.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const handleGameSearch = (event) => {
    if (event?.target?.value) {
      const link = `http://${process.env.REACT_APP_API_URL}/game?searchKey=${event.target.value}`;
      axios
        .get(link, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response);
          setGames(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setGames([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setRefresh(!refresh);
  };

  const handleCreateButton = () => {
    if (auth) {
      navigate(`/create-group`);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowLoginPopup(false);
  };
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGameChange = (event, option) => {
    if (option) {
      setSearchGame(option.value);
    } else {
      setSearchGame("");
    }
  };

  const handleTagsChange = (e) => {
    setCurrTag(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrTag("");
    }
  };

  const handleDeleteTag = (item, index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    console.log(item);
    setTags(arr);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleJoinedOnlyChange = (event) => {
    setJoinedOnly(event.target.checked);
  };

  const handleFilterButtonClick = () => {
    setPage(1);
    setRefresh(!refresh);
  };

  const paginStyle = {
    backgroundColor: "rgba(204, 204, 255, 0.9)",
    borderRadius: "10px",
    border: "4px solid rgba(51, 153, 255, 1)", // Çerçeve rengi ve genişliği
    boxSizing: "border-box", // Kutu modelini içerir
    fontFamily: "Trebuchet MS, sans-serif",
    width: "auto",
    marginTop: "10px",
  };

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <Grid container spacing={1}>
        <img
          src={GroupsImage}
          alt="groupImage"
          style={{ width: "100%", height: "auto", marginBottom: "20px" }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{
            backgroundColor: "rgb(30,30,30,0.9)",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Create a Group to Find New Friends to Play
          </Typography>
          <div>
            <Button
              variant="contained"
              type="regular"
              size="large"
              onClick={handleCreateButton}
              style={{
                marginTop: "10px",
                backgroundColor: "rgba(204, 204, 255, 1)",
                color: "black",
                textTransform: "none",
                font: "Trebuchet MS, sans-serif",
                marginLeft: "10px",
              }}
            >
              Create a Group
            </Button>
            <Snackbar
              open={showLoginPopup}
              autoHideDuration={5000} // Adjust the duration as needed
              onClose={handleCloseNotification}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleCloseNotification} severity="warning">
                Please log in to create a group.
              </Alert>
            </Snackbar>
          </div>
        </Grid>

        {/* Left Column */}
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          style={{
            backgroundColor: "rgba(51, 153, 255, 1)",
            height: `${myComponentRef?.current?.clientHeight + 520}px`,
            borderRadius: "10px",
            paddingRight: "10px",
            marginTop: "10px",
          }}
        >
          {/* Search Input */}
          <Typography
            variant="h7"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Group Name:
          </Typography>
          <TextField
            type="text"
            label="Search the Group Name"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />

          <Typography
            variant="h7"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Filter with Tags:
          </Typography>
          <div ref={myComponentRef}>
            <FormControl
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                flexDirection: "row",
                border: "2px solid lightgray",
                padding: 1,
                borderRadius: "4px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            >
              <div className={"container"}>
                {tags.map((item, index) => (
                  <Chip
                    key={index}
                    size="small"
                    onDelete={() => handleDeleteTag(item, index)}
                    label={item}
                  />
                ))}
              </div>
              <Input
                value={currTag}
                onChange={handleTagsChange}
                onKeyDown={handleKeyUp}
              />
            </FormControl>
          </div>
          <Typography
            variant="h7"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Filter with Game:
          </Typography>
          <Autocomplete
            onChange={handleGameChange}
            options={games.map((game) => ({
              label: game.title,
              value: game.id,
            }))}
            getOptionLabel={(option) => option.label || ""}
            onInputChange={handleGameSearch}
            required
            renderInput={(params) => (
              <TextField {...params} label="Search Game" width="90%" />
            )}
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <Typography
            variant="h7"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Sort By:
          </Typography>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            onChange={handleSortByChange}
            label="Sort By Field"
            placeholder="Sort By Field"
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            {[
              { value: "name", label: "Name" },
              {
                value: "maxNumberOfMembers",
                label: "Number of Maximum Members",
              },
              // Add other sorting options as needed
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Typography
            variant="h7"
            gutterBottom
            style={{
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Sort Order:
          </Typography>
          <Select
            labelId="sortTypeLabel"
            id="sortType"
            value={sortOrder}
            onChange={handleSortOrderChange}
            label="Sort By Field"
            placeholder="Sort By Field"
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            {[
              { value: "ASC", label: "Ascending" },
              { value: "DESC", label: "Descending" },
              // Add other sorting options as needed
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={
              <Checkbox
                checked={joinedOnly}
                onChange={handleJoinedOnlyChange}
                name="joinedOnly"
              />
            }
            label="Show joined groups only"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFilterButtonClick}
            style={{
              backgroundColor: "pink",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Filter
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          md={9}
          lg={9}
          style={{ display: "grid", gap: "32px" }}
        >
          {/* Main Content */}
          {groups.map((topic, index) => (
            <GroupTopic key={index} topic={topic} />
          ))}
          <Pagination
            count={pageCount}
            color="secondary"
            page={page}
            onChange={handlePageChange}
            style={paginStyle}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForumsPage;
