import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForumsBackground from "../assets/forumBackground.png";
import { Typography, Button, TextField, Container } from "@mui/material";
import ForumTopic from "../components/ForumTopic";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const ForumsPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [threads, setThreads] = useState([]);
  const [games, setGames] = useState([]);
  const [gameThreads, setGameThreads] = useState([]);
  const mergedThreads = [...threads, ...gameThreads];
  const uniqueOptions = Array.from(
    new Set(mergedThreads.map((item) => item.title)),
  );

  const handleThreadSearch = (threadId) => {
    //value should be the id of the thread
    navigate(`/thread/${threadId}`);
  };

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  /*
  useEffect(() => {
    const fetchGames = async () => {
      if (searchKey) {
        axiosInstance
          .get(`/game?searchKey=${searchKey}`)
          .then((response) => {
            console.log(response);
            const gamesData = response.data.items;
            setGames(gamesData);

            // Fetch threads for each game
            gamesData.forEach((game) => {
              axiosInstance
                .get(`/post?gameId=${game.id}`)
                .then((threadsResponse) => {
                  // Update gameThreads with fetched threads
                  setGameThreads((prevGameThreads) => [
                    ...prevGameThreads,
                    ...threadsResponse.data.items,
                  ]);
                })
                .catch((error) => {
                  console.log(
                    `Error fetching threads for game ${game.title}: `,
                    error,
                  );
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log(
        Array.from(
          new Set([...threads, ...gameThreads].map((item) => item.title)),
        ),
      );
    };

    fetchGames();
  }, [searchKey]);
*/

  // This function will be executed every time `searchKey` changes

  const fetchData = async () => {
    try {
      if (searchKey) {
        // Fetch games
        const gamesResponse = await axiosInstance.get(
          `/game?searchKey=${searchKey}`,
        );
        const gamesData = gamesResponse.data.items;
        setGames(gamesData);

        // Fetch threads for each game
        const threadsPromises = gamesData.map((game) => {
          return axiosInstance.get(`/post?gameId=${game.id}`);
        });

        const threadsResponses = await Promise.all(threadsPromises);
        const combinedThreads = threadsResponses.reduce((acc, response) => {
          return acc.concat(response.data.items);
        }, []);

        // Fetch threads based on searchKey
        const searchThreadsResponse = await axiosInstance.get(
          `/post?searchKey=${searchKey}`,
        );
        const searchThreadsData = searchThreadsResponse.data.items;
        console.log("**");
        console.log(combinedThreads);

        // Combine and filter unique threads based on their titles
        const allThreads = [...combinedThreads, ...searchThreadsData];
        const uniqueThreads = allThreads.filter((thread, index, self) => {
          return index === self.findIndex((t) => t.title === thread.title);
        });

        setThreads(uniqueThreads);
        console.log(threads);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchKey) {
      fetchData();
    }
  }, [searchKey]);

  // Check if `searchKey` exists (truthy value), then trigger the fetchGames function

  const handleButtonClickUnlogged = () => {
    navigate("/signup");
  };

  const handleButtonClickLogged = () => {
    navigate("/create-thread");
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUserLoggedIn(true);
    }
  }, []);

  const latestTopics = [
    {
      title: "Are League of Legends players smart?",
      numOfReplies: 10,
      userOpened: "ClementKachepa",
      whenOpened: "2 hours ago",
      forumTags: ["League of Legends", "Question"],
      forumGame: "League of Legends",
    },
    {
      title: "How many houses do you have in Sims 3?",
      numOfReplies: 8,
      userOpened: "wannaPlayWithLife",
      whenOpened: "4 hours ago",
      forumTags: ["Question", "Sims 3"],
      forumGame: "Sims 3",
    },
    {
      title: "I stuck on the mission 65, HELPP!!",
      numOfReplies: 16,
      userOpened: "GtaLoveeer",
      whenOpened: "10 hours ago",
      forumTags: ["Gta 5", "Help Wanted"],
      forumGame: "GTA 5",
    },
    // Add more topics as needed...
  ];

  const trendTopics = [
    {
      title: "OMG! New Character for Dota",
      numOfReplies: 150,
      userOpened: "loverGame",
      whenOpened: "2 days ago",
      forumTags: ["Dota", "New Character"],
      forumGame: "Dota",
      imgsrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oAlf6eD-4mrGrbTaWeg2Ec17AhQLgfuYBQ&usqp=CAU",
    },
    {
      title: "Tell your best memory of Minecraft",
      numOfReplies: 240,
      userOpened: "minemine",
      whenOpened: "1 week ago",
      forumTags: ["Minecraft", "Discussion"],
      forumGame: "Minecraft",
      imgsrc:
        "https://cdn-www.bluestacks.com/bs-images/54ea74e2f2d10d2ad3a957260f564bea.png",
    },
    {
      title: "Who is your favorite character in Witcher 3",
      numOfReplies: 167,
      userOpened: "witchPlay",
      whenOpened: "5 days ago",
      forumTags: ["Witcher 3", "Question"],
      forumGame: "Witcher 3",
      imgsrc:
        "https://assets-prd.ignimgs.com/2022/04/15/zuko-alone-1650039877625.jpg",
    },
    // Add more topics as needed...
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gap: "48px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxWidth: "960px",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
        }}
      >
        <img
          src={ForumsBackground}
          style={{ width: "100%", height: "auto" }}
          alt="Background"
        />
        <div
          style={{
            position: "absolute" /* Set position to absolute */,
            top: "50%" /* Position vertically in the middle */,
            left: "50%" /* Position horizontally in the middle */,
            transform: "translate(-50%, -180%)" /* Center the content */,
            textAlign: "center",
            width: "80%" /* Adjust width as needed */,
          }}
        >
          <Typography
            style={{
              fontSize: "92px",
              color: "white",
              fontFamily: "Trebuchet MS, sans-serif",
              fontWeight: "bolder",
            }}
          >
            The Ludos Forum
          </Typography>
        </div>
        <div
          style={{
            position: "absolute" /* Set position to absolute */,
            top: "50%" /* Position vertically in the middle */,
            left: "50%" /* Position horizontally in the middle */,
            transform: "translate(-50%, 200%)" /* Center the content */,
            textAlign: "center",
            width: "80%" /* Adjust width as needed */,
          }}
        >
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center" /* Align items horizontally */,
              justifyContent: "center" /* Center items horizontally */,
              width: "600px" /* Enlarged search bar width */,
              margin: "0 auto" /* Center the form */,
            }}
          >
            <Autocomplete
              value={searchValue}
              onChange={(event, newValue) => {
                setSearchValue(newValue);
                if (newValue) {
                  const selectedThread = threads.find(
                    (thread) => thread.title === newValue,
                  );
                  if (selectedThread) {
                    handleThreadSearch(selectedThread.id); // Navigate to thread page using the selected thread's ID
                  }
                }
              }}
              options={threads.map((thread) => thread.title)}
              filterOptions={(options) => options} //to select all the options
              clearOnBlur={true}
              clearOnEscape={true}
              onInputChange={(event, newInputValue) => {
                setSearchKey(newInputValue);

                console.log(threads.map((thread) => thread.title));
              }}
              //getOptionLabel={(option) => option.threadTitle} // Replace 'threadTitle' with the actual property name
              required
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Threads..."
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
        </div>
      </div>
      <Container
        style={{
          backgroundColor: "rgb(30,30,30,0.9)",
          maxWidth: "960px",
          borderRadius: "10px",
          textAlign: "center",
          padding: "20px",
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
          Join the discussion! Create your forum thread now.
        </Typography>
        {userLoggedIn ? (
          <Button
            variant="contained"
            type="regular"
            size="large"
            style={{ marginTop: "10px", backgroundColor: "rgb(254,8,8, 0.6)" }}
            sx={{ marginLeft: "10px" }}
            onClick={handleButtonClickLogged}
          >
            Create a Thread
          </Button>
        ) : (
          <Button
            variant="contained"
            type="regular"
            size="large"
            style={{ marginTop: "10px", backgroundColor: "rgb(254,8,8, 0.9)" }}
            sx={{ marginLeft: "10px" }}
            onClick={handleButtonClickUnlogged}
          >
            Create a Thread
          </Button>
        )}
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          maxWidth: "1152px",
          width: "100%",
          alignSelf: "center",
          position: "relative" /* Set position to relative */,
          gap: "48px",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgb(30,30,30,0.9)",
            width: "100%",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flex: "1",
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
            Trending
          </Typography>
          {/* Render your forum topics below */}
          {/* Replace this section with your actual forum topics */}
          <div
            style={{ gap: "16px", display: "flex", flexDirection: "column" }}
          >
            {trendTopics.map((topic, index) => (
              <ForumTopic key={index} topic={topic} />
            ))}
          </div>
        </Container>
        <Container
          style={{
            backgroundColor: "rgb(30,30,30,0.9)",
            width: "100%",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flex: "1",
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
            Latest
          </Typography>
          {/* Render your forum topics below */}
          {/* Replace this section with your actual forum topics */}
          <div>
            <div
              style={{ gap: "16px", display: "flex", flexDirection: "column" }}
            >
              {latestTopics.map((topic, index) => (
                <ForumTopic key={index} topic={topic} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ForumsPage;
