import React, { useState, useRef } from "react";
import { Button, Typography, Chip, FormControl, Grid, Input, Select, MenuItem, Checkbox, FormControlLabel, Pagination } from "@mui/material";
import Container from "@mui/material/Container";
import TrendingGamesSlider from "../components/TrendingGamesSlider";
import GameCard from "../components/GameCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForumTopic from "../components/ForumTopic";

const gameHighlight = [
  {
    title: "Baldur's Gate 3",
    image:
      "https://www.technopat.net/sosyal/eklenti/1692017243090-png.1902461/",
    content:
      "Embark on an epic adventure in Witcher 3, where every choice you make shapes your destiny. Immerse yourself in a rich, vast open world filled with monsters, mysteries, and morally complex decisions.",
  },
  {
    title: "Undertale",
    image: "https://cdn.wannart.com/production/post/2018/12/Undertale-1.png",
    content:
      "Welcome to UNDERTALE. In this RPG, you control a human who falls underground into the world of monsters. Now you must find your way out... or stay trapped forever.",
  },
  {
    title: "Football Manager 2024",
    image:
      "https://cdn1.epicgames.com/offer/610a546d4e204215a0b9a1c8a382bacb/EGS_FootballManager2024_SportsInteractive_S2_1200x1600-d59e8b3545615cbc8a51d8acd316dd60",
    content:
      "Take on the role of a football manager in Football Manager 2024, where every decision you make shapes the destiny of your team. Immerse yourself in the world of football, filled with tactics, transfers, and morally complex choices as you strive for victory on the pitch.",
  },
];

const convertToSlug = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
};

const predefinedTags = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Fighting",
  "Horror",
  "Puzzle",
  "Multiplayer",
  "Indie",
  "RTS",
  "Racing",
  "Open World",
  "Educational",
  "VR",
  "Survival",
  "Story-Driven",
  "Retro",
  "Anime",
  "Hack and Slash",
  "Mystery",
  "Historical",
  "Sci-Fi",
  "Fantasy",
  "Comedy",
  "Artistic",
  "Puzzle-Platformer",
];

export default function GamesPage() {
  const myComponentRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [games, setGames] = useState([]);
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [upcomingTitles, setUpcomingTitles] = useState([]);
  const [detailSearch, setDetailSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [currTag, setCurrTag] = useState("");
  const [developer, setDeveloper] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [isFollowed, setIsFollowed] = useState(false);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [auth, setAuth] = useState(false);
  const [detailGames, setDetailGames] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isTagSelected, setIsTagSelected] = useState(false);


  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  const navigate = useNavigate();

  const handleDetailSearch = () => {
    if (detailSearch) {
      setDetailSearch(false);
    } else {
      setDetailSearch(true);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDeveloperInputChange = (event) => {
    setDeveloper(event.target.value);
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

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleIsFollowedChange = (event) => {
    setIsFollowed(event.target.checked);
  };

  const handleFilterButtonClick = () => {
    setPage(1);
    setRefresh(!refresh);
    console.log("girdim");
  };

  const handleGameRoute = (value) => {
    navigate(`/game/${convertToSlug(value)}`);
  };

  const handleTagSelect = (selectedTags) => {
    setIsTagSelected(selectedTags.length > 0);
    setTags(selectedTags);
  };

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
    const link = `http://${process.env.REACT_APP_API_URL}/game?page=${page}&searchKey=${searchInput}&tags=${tagsString}&developer=${developer}&order=${sortOrder}&isFollowed=${isFollowed}&orderByKey=${sortBy}`;
    console.log(link);
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setDetailGames(response.data.items);
        setPageCount(response.data.meta.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setRefresh(!refresh);
  };

  useEffect(() => {
    axiosInstance
      .get(`/user/suggested`)
      .then((response) => {
        setSuggestedGames(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    axiosInstance
      .get(
        "/post?isLiked=false&isDisliked=false&isUpcomingTitle=true&order=ASC&orderByKey=numberOfLikes",
      )
      .then((response) => {
        const formattedTopics = response.data.items.map((topic) => ({
          title: topic?.title,
          numOfReplies: topic?.numOfReplies,
          userOpened: topic?.user.username,
          imgsrc: topic?.user.avatar,
          whenOpened: new Date(topic?.createdAt).toLocaleDateString(
            "en-US",
            options,
          ),
          forumTags: topic?.tags,
          forumGame: topic?.game.title,
          id: topic?.id,
          userId: topic?.user.id,
          isUpcomingTitle:
            topic?.upcomingTitle != null
              ? topic?.upcomingTitle?.isUpcomingTitle
              : false,
        }));
        console.log("formattedTopics:");
        console.log(formattedTopics);
        setUpcomingTitles(formattedTopics);
        console.log("upcomingTitles:");
        console.log(upcomingTitles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      axiosInstance
        .get(`/game?searchKey=${searchKey}`)
        .then((response) => {
          console.log(response);
          setGames(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (searchKey) {
      fetchGames();
    }
  }, [searchKey]);



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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Other homepage content */}
      <div
        style={{
          backgroundColor: "#71dfcf",
          backgroundImage: `url(https://images8.alphacoders.com/131/1314784.png)`,
          backgroundSize: "cover",
          textAlign: "center",
          display: "flex",
          width: "70%" /* Adjust width as needed */,
          flexDirection: "column",
          alignSelf: "center",
          borderRadius: "40px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            fontFamily: "Trebuchet MS, sans-serif",
            fontWeight: "bold",
            fontSize: "75px",
          }}
        >
          Games
        </Typography>
      </div>

      <TrendingGamesSlider games={gameHighlight} />
      {/* Other sections */}
      <div
        style={{
          backgroundColor: "rgb(231, 158, 74)",
          textAlign: "center",
          width: "75%" /* Adjust width as needed */,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          borderRadius: "40px",
          backgroundImage: `url(https://i.pinimg.com/736x/02/ba/86/02ba867e545f953631148c89629412b1.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "white",
            fontFamily: "Trebuchet MS, sans-serif",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Search Games
        </Typography>
        <Autocomplete
          value={searchValue}
          onChange={(event, newValue) => {
            setSearchValue(newValue);
            if (newValue) {
              handleGameRoute(newValue);
            }
          }}
          options={games.map((game) => game.title)}
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
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', marginBottom: '10px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: '40px', display: 'flex', backgroundColor: 'green' }}
              onClick={handleDetailSearch}
            >
              {detailSearch ? "Close" : "Detailed Search"}
            </Button>
          </div>

          {detailSearch ? (
            <div style={{ padding: "10px" }}>
              <Grid
                item
                xs={12}
                style={{
                  backgroundColor: "rgba(151, 153, 255)",
                  height: `${myComponentRef?.current?.clientHeight + 520}px`,
                  borderRadius: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  padding: "10px",
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
                  Game Title:
                </Typography>
                <TextField
                  type="text"
                  label="Search the GameTitle"
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
                <Select
                  label="Tags"
                  labelId="tags-label"
                  id="tags"
                  name="tags"
                  multiple
                  value={tags}
                  onChange={(e) => handleTagSelect(e.target.value)}
                  fullWidth
                  renderValue={(selected) => (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {selected.map((tag) => (
                        <Chip key={tag} label={tag} style={{ margin: 2 }} />
                      ))}
                    </div>
                  )}
                >
                  {predefinedTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
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
                  Filter with Developer:
                </Typography>
                <TextField
                  type="text"
                  label="Search the Developer"
                  placeholder="Search..."
                  value={developer}
                  onChange={handleDeveloperInputChange}
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
                    { value: "title", label: "Title" },
                    {
                      value: "followers",
                      label: "Followers",
                    },
                    {
                      value: 'id',
                      label: 'Id',
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
                      checked={isFollowed}
                      onChange={handleIsFollowedChange}
                      name="isFollowed"
                    />
                  }
                  label="Show followed games only"
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

              <Grid item xs={12} sm={9} md={9} lg={9}>
                {detailGames?.map((game, index) => (
                  <GameCard key={index} game={game} />
                ))}
                <Pagination
                  count={pageCount}
                  color="secondary"
                  page={page}
                  onChange={handlePageChange}
                  style={paginStyle}
                />
              </Grid>
            </div>
          ) : (<div />)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1152px",
          width: "100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
          alignItems: "flex-start",
          marginBottom: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.6)",
            flex: "2",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
          }}
          sm={8}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{
              color: "black",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Suggested Games
          </Typography>
          <div
            style={{ gap: "16px", display: "flex", flexDirection: "column" }}
          >
            {suggestedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </Container>
        <Container
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.3)",
            flex: "1",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
          }}
          sm={4}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{
              color: "black",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bold",
            }}
          >
            Upcoming Titles
          </Typography>
          {/* Render your forum topics below */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              {upcomingTitles.map((topic, index) => {
                return <ForumTopic key={index} topic={topic} />;
              })}
            </div>
          </div>
        </Container>
      </div>
    </div >
  );
}
