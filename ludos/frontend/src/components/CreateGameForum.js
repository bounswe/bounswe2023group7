import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chip from "@mui/material/Chip";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGameForm = (formComp) => {
  const convertToSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  const navigate = useNavigate();
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    gameBio: "",
    tags: [],
    predecessors: [""],
    successors: [""],
    coverLink: "",
    ageRestriction: "",
    releaseDate: "",
    developer: "",
    publisher: "",
    platforms: [],
    gameStory: "",
    trivia: "",
    systemRequirements: {
      minimum: {
        CPU: "",
        RAM: "",
        GPU: "",
        OS: "",
        DirectX: "",
        Storage: "",
        Network: "",
      },
      recommended: {
        CPU: "",
        RAM: "",
        GPU: "",
        OS: "",
        DirectX: "",
        Storage: "",
        Network: "",
      },
    },
    gameGuide: "",
  });
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

  const predefinedPlatforms = [
    "Android",
    "iOS",
    "Windows",
    "macOS",
    "Linux",
    "PlayStation",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "Xbox",
    "Xbox 360",
    "Xbox One",
    "Xbox Series X",
    "Xbox Series S",
    "Nintendo Switch",
    "Nintendo Entertainment System (NES)",
    "Super Nintendo Entertainment System (SNES)",
    "Nintendo 64",
    "GameCube",
    "Wii",
    "Wii U",
    "Game Boy",
    "Game Boy Color",
    "Game Boy Advance",
    "Nintendo DS",
    "Nintendo 3DS",
    "Sega Master System",
    "Sega Genesis",
    "Sega Saturn",
    "Sega Dreamcast",
    "Atari 2600",
    "Atari 5200",
    "Atari 7800",
    "Atari Lynx",
    "Neo Geo",
    "TurboGrafx-16",
    "Intellivision",
    "ColecoVision",
    "Magnavox Odyssey",
    "Commodore 64",
    "Amiga",
    "ZX Spectrum",
    "MSX",
    "Oculus Rift",
    "HTC Vive",
    "PlayStation VR",
    "Oculus Quest",
    "Google Stadia",
    "Amazon Luna",
    "Steam Deck",
    "Apple Arcade",
    "Game & Watch",
    "Pokémon Mini",
    "Commodore VIC-20",
    "Atari Jaguar",
    "3DO Interactive Multiplayer",
    "Philips CD-i",
    "WonderSwan",
    "WonderSwan Color",
    "Tapwave Zodiac",
    "N-Gage",
    "GP32",
    "ZX81",
    "Amstrad CPC",
    "TRS-80",
    "Sharp X68000",
    "Fairchild Channel F",
    "Bally Astrocade",
    "Vectrex",
    "Board Game",
    "Card Game",
    // Add more platforms as needed
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [releaseDateGiven, setReleaseDateGiven] = useState(false);
  const totalSteps = 4;

  useEffect(() => {
    if (formComp.formData !== null) {
      setFormData(formComp.formData);
      setIsTagSelected(formComp.formData.tags.length > 0);
      setReleaseDateGiven(formComp.formData.releaseDate != "");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is part of the system requirements
    if (name.startsWith("systemRequirements")) {
      const [, category, field] = name.split("-");

      setFormData((prevData) => ({
        ...prevData,
        systemRequirements: {
          ...prevData.systemRequirements,
          [category]: {
            ...prevData.systemRequirements[category],
            [field]: value,
          },
        },
      }));
    } else {
      const parsedValue =
        name === "tags" ||
        name === "platforms" ||
        name === "predecessors" ||
        name === "successors"
          ? value.split(",")
          : value;
      // Update the main form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));
      if (name === "releaseDate") {
        setReleaseDateGiven(!!value); // Set releaseDateGiven to true if value is not empty
      }
    }
  };

  const handlePlatformSelect = (selectedPlatforms) => {
    setFormData((prevData) => ({
      ...prevData,
      platforms: selectedPlatforms,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
    console.log(currentStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleTagSelect = (selectedTags) => {
    setIsTagSelected(selectedTags.length > 0);
    setFormData((prevData) => ({
      ...prevData,
      tags: selectedTags,
    }));
    console.log(selectedTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isTagSelected) {
      toast.error("Please select at least one tag!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Prevent form submission
    }
    if (!releaseDateGiven) {
      toast.error("Please give a release date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Prevent form submission
    }

    if (formComp.formData !== null) {
      const apiUrl = `http://${process.env.REACT_APP_API_URL}/game/${formComp.formData.id}/edit`;

      axios
        .put(apiUrl, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          // Game created successfully
          toast.success("Kudos to you! Game is edited", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log("Game edited successfully:", response.data);
          navigate(`/game/${convertToSlug(formData.title)}`);
        })
        .catch((error) => {
          // Error creating game
          toast.error("Game creation failed", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error("Error creating game:", error);
        });
    } else {
      const apiUrl = `http://${process.env.REACT_APP_API_URL}/game`;

      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Game created successfully
          toast.success("Kudos to you! Game is created", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log("Game created successfully:", response.data);
          navigate(`/game/${convertToSlug(formData.title)}`);
          window.location.reload();
        })
        .catch((error) => {
          // Error creating game
          toast.error("Game creation failed", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error("Error creating game:", error);
        });
    }
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Grid container>
              <Grid container spacing={4} style={{ marginTop: 5 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Image"
                    name="coverLink"
                    type="url"
                    value={formData.coverLink}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginTop: 5 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Game Bio"
                    name="gameBio"
                    multiline
                    value={formData.gameBio}
                    onChange={handleInputChange}
                    minRows={3}
                    fullWidth
                    style={{ marginTop: 10 }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} style={{ marginTop: "1px" }}>
                <Grid item xs={6}>
                  <InputLabel id="ageRestriction-label">
                    Age Restriction
                  </InputLabel>
                  <Select
                    label="Age Restriction"
                    labelId="ageRestriction-label"
                    id="ageRestriction"
                    name="ageRestriction"
                    value={formData.ageRestriction}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    <MenuItem value="3+">3+</MenuItem>
                    <MenuItem value="7+">7+</MenuItem>
                    <MenuItem value="12+">12+</MenuItem>
                    <MenuItem value="16+">16+</MenuItem>
                    <MenuItem value="18+">18+</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="tags-label">Tags</InputLabel>
                  <Select
                    label="Tags"
                    labelId="tags-label"
                    id="tags"
                    name="tags"
                    multiple
                    value={formData.tags}
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
                </Grid>
              </Grid>

              <Grid container spacing={4} style={{ marginTop: 5 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Predecessors"
                    name="predecessors"
                    value={formData.predecessors}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Successors"
                    name="successors"
                    value={formData.successors}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        );

      case 2:
        return (
          <>
            <InputLabel htmlFor="releaseDate">Release Date</InputLabel>
            <TextField
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Developer"
              name="developer"
              value={formData.developer}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <InputLabel id="platforms-label">Platforms</InputLabel>
            <Select
              label="Platforms"
              labelId="platforms-label"
              id="platforms"
              name="platforms"
              multiple
              value={formData.platforms}
              onChange={(e) => handlePlatformSelect(e.target.value)}
              fullWidth
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((platform) => (
                    <Chip
                      key={platform}
                      label={platform}
                      style={{ margin: 2 }}
                    />
                  ))}
                </div>
              )}
            >
              {predefinedPlatforms.map((platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>
          </>
        );

      case 3:
        return (
          <>
            <TextField
              label="Game Story"
              name="gameStory"
              value={formData.gameStory}
              onChange={handleInputChange}
              multiline
              fullWidth
              minRows={3}
              style={{ marginTop: 10 }}
            />
            <TextField
              label="Game Guide"
              name="gameGuide"
              multiline
              value={formData.gameGuide}
              onChange={handleInputChange}
              minRows={3}
              fullWidth
              style={{ marginTop: 10 }}
            />
            <TextField
              label="Trivia"
              name="trivia"
              multiline
              value={formData.trivia}
              onChange={handleInputChange}
              minRows={3}
              fullWidth
              style={{ marginTop: 10 }}
            />
          </>
        );

      case 4:
        return (
          <>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom marginBottom="40px">
                  Minimum System Requirements
                </Typography>
                <TextField
                  label="CPU"
                  name="systemRequirements-minimum-CPU"
                  value={formData.systemRequirements?.minimum?.CPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="RAM"
                  name="systemRequirements-minimum-RAM"
                  value={formData.systemRequirements?.minimum?.RAM}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="GPU"
                  name="systemRequirements-minimum-GPU"
                  value={formData.systemRequirements?.minimum?.GPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Operating System"
                  name="systemRequirements-minimum-OS"
                  value={formData.systemRequirements?.minimum?.OS}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="DirectX"
                  name="systemRequirements-minimum-DirectX"
                  value={formData.systemRequirements?.minimum?.DirectX}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Storage"
                  name="systemRequirements-minimum-Storage"
                  value={formData.systemRequirements?.minimum?.Storage}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Network"
                  name="systemRequirements-minimum-Network"
                  value={formData.systemRequirements?.minimum?.Network}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Recommended System Requirements
                </Typography>
                <TextField
                  label="CPU"
                  name="systemRequirements-recommended-CPU"
                  value={formData.systemRequirements?.recommended?.CPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="RAM"
                  name="systemRequirements-recommended-RAM"
                  value={formData.systemRequirements?.recommended?.RAM}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="GPU"
                  name="systemRequirements-recommended-GPU"
                  value={formData.systemRequirements?.recommended?.GPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Operating System"
                  name="systemRequirements-recommended-OS"
                  value={formData.systemRequirements?.recommended?.OS}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="DirectX"
                  name="systemRequirements-recommended-DirectX"
                  value={formData.systemRequirements?.recommended?.DirectX}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Storage"
                  name="systemRequirements-recommended-Storage"
                  value={formData.systemRequirements?.recommended?.Storage}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Network"
                  name="systemRequirements-recommended-Network"
                  value={formData.systemRequirements?.recommended?.Network}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                fontFamily: "Trebuchet MS, sans-serif",
                color: "#0C1929",
              }}
            >
              Create a Game - Step {currentStep}
            </Typography>
            <form onSubmit={handleSubmit}>
              {renderStepForm()}

              {/* Navigation Buttons */}
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: 10 }}
              >
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  variant="outlined"
                >
                  Back
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    type="button"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    {formComp.formData ? "Edit Game" : "Create Game"}
                  </Button>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateGameForm;
