import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  Box,
  FormControl,
  Chip,
  Input,
} from "@mui/material";
import axios from "axios";
import Textarea from "@mui/joy/Textarea";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const CreateGroupPage = () => {
  const [tags, setTags] = useState([]);
  const [currTag, setCurrTag] = useState("");
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState("normal");
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [serverError, setServerError] = useState(false);
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [bodyEmpty, setBodyEmpty] = useState(false);
  const [member, setMember] = useState(0);
  const [memberCheck, setMemberCheck] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoEmpty, setLogoEmpty] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrTag("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const HandleMemberChange = (event) => {
    setMemberCheck(false);
    setMember(event.target.value);
  };

  const handleChange = (e) => {
    setCurrTag(e.target.value);
  };

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

  const handleDeleteTag = (item, index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    console.log(item);
    setTags(arr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.length === 0 || title === "") {
      setSnackbarMessage("Title cannot be empty!");
      setServerError(true);
      setTitleEmpty(true);
      setSnackbar(true);
      return;
    } else if (body.length === 0 || body === "") {
      setSnackbarMessage("Description cannot be empty!");
      setServerError(true);
      setBodyEmpty(true);
      setSnackbar(true);
      return;
    } else if (!value || value.length === 0 || value === "") {
      setSnackbarMessage("Game cannot be empty!");
      setServerError(true);
      setSnackbar(true);
      return;
    } else if (parseInt(member) <= 1 || isNaN(parseInt(member))) {
      setSnackbarMessage("Max number of members must be greater than 1!");
      setServerError(true);
      setSnackbar(true);
      setMemberCheck(true);
    } else if (!logo || logo.length === 0 || logo === "") {
      setSnackbarMessage("Logo link cannot be empty!");
      setServerError(true);
      setSnackbar(true);
      return;
    } else {
      let gameId = games.filter((game) => game.title === value)[0].id;
      const maxNumberOfMembers = parseInt(member);
      const description = body;
      const name = title;

      axiosInstance
        .post("/group", {
          gameId,
          maxNumberOfMembers,
          description,
          name,
          logo,
          tags,
        })
        .then((response) => {
          setSnackbarMessage("Group created successfully!");
          setSnackbar(true);
          navigate(`/group/${response.data.id}`);
          console.log(response);
        })
        .catch((error) => {
          setSnackbarMessage(
            "An error occurred while creating the group!: " +
              error.response.data.message,
          );
          setServerError(true);
          console.log(error);
        });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "90%" }}>
      <Grid
        container
        spacing={1}
        xs={8}
        sx={{ backgroundColor: "white", padding: "15px", borderRadius: "25px" }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Create Group
        </h1>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>Title:</h3>
          <TextField
            label="Title"
            required
            fullWidth
            margin="auto"
            id="title"
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleEmpty(false);
            }}
            error={titleEmpty}
            helperText={titleEmpty ? "Title cannot be empty." : ""}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>
            Max Number of Members:
          </h3>
          <TextField
            label="Max Number of Members"
            required
            fullWidth
            margin="auto"
            id="title"
            onChange={HandleMemberChange}
            error={memberCheck}
            helperText={
              titleEmpty ? "Max number of members must be greater than 1." : ""
            }
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>
            Logo Link:
          </h3>
          <TextField
            label="Logo Link"
            required
            fullWidth
            margin="auto"
            id="title"
            onChange={(event) => {
              setLogo(event.target.value);
              setLogoEmpty(false);
            }}
            error={logoEmpty}
            helperText={logoEmpty ? "Logo link must be given." : ""}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>Game:</h3>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            options={games.map((game) => game.title)}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                setSearchKey(newInputValue);
                console.log("on input change");
              }
            }}
            required
            renderInput={(params) => <TextField {...params} label="Game" />}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>Tags:</h3>
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
              onChange={handleChange}
              onKeyDown={handleKeyUp}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>
            Description:
          </h3>
          <FormControl fullWidth>
            <Textarea
              placeholder="Description"
              minRows={5}
              endDecorator={
                <Box
                  sx={{
                    display: "flex",
                    gap: "var(--Textarea-paddingBlock)",
                    pt: "var(--Textarea-paddingBlock)",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    flex: "auto",
                  }}
                >
                  <IconButton
                    variant="plain"
                    color="neutral"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    <FormatBold />
                    <KeyboardArrowDown fontSize="md" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    size="sm"
                    placement="bottom-start"
                    sx={{ "--ListItemDecorator-size": "24px" }}
                  >
                    {["200", "normal", "bold"].map((weight) => (
                      <MenuItem
                        key={weight}
                        selected={fontWeight === weight}
                        onClick={() => {
                          setFontWeight(weight);
                          setAnchorEl(null);
                        }}
                        sx={{ fontWeight: weight }}
                      >
                        <ListItemDecorator>
                          {fontWeight === weight && <Check fontSize="sm" />}
                        </ListItemDecorator>
                        {weight === "200" ? "lighter" : weight}
                      </MenuItem>
                    ))}
                  </Menu>
                  <IconButton
                    variant={italic ? "soft" : "plain"}
                    color={italic ? "primary" : "neutral"}
                    aria-pressed={italic}
                    onClick={() => setItalic((bool) => !bool)}
                  >
                    <FormatItalic />
                  </IconButton>
                </Box>
              }
              sx={{
                minWidth: 300,
                fontWeight,
                fontStyle: italic ? "italic" : "initial",
              }}
              onChange={(event) => {
                setBody(event.target.value);
                setBodyEmpty(false);
              }}
              error={bodyEmpty}
              helperText={bodyEmpty ? "Body cannot be empty." : ""}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          spacing={1}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Button
            variant="contained"
            color="secondary"
            my={10}
            onClick={handleSubmit}
            sx={{ mt: 5 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={serverError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateGroupPage;
