import React, { useState } from "react";
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

const CreateGameForm = () => {
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
  ];

  const predefinedPlatforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Mobile",
    "VR",
    "Web Browser",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "tags" ||
      name === "platforms" ||
      name === "predecessors" ||
      name === "successors"
        ? value.split(",")
        : value;
    const [category, field] = name.split("-");

    setFormData((prevData) => ({
      ...prevData,
      systemRequirements: {
        ...prevData.systemRequirements,
        [category]: {
          ...prevData.systemRequirements[category],
          [field]: parsedValue,
        },
      },
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      tags: selectedTags,
    }));
    console.log(selectedTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'your-api-endpoint' with the actual endpoint
    const apiUrl = `http://${process.env.REACT_APP_API_URL}/game`;

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success, maybe redirect or show a success message
        console.log("Game created successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors, show an error message, etc.
        console.error("Error creating game:", error);
      });
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
                  value={formData.systemRequirements.minimum.CPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="RAM"
                  name="systemRequirements-minimum-RAM"
                  value={formData.systemRequirements.minimum.RAM}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="GPU"
                  name="systemRequirements-minimum-GPU"
                  value={formData.systemRequirements.minimum.GPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Operating System"
                  name="systemRequirements-minimum-OS"
                  value={formData.systemRequirements.minimum.OS}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="DirectX"
                  name="systemRequirements-minimum-DirectX"
                  value={formData.systemRequirements.minimum.DirectX}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Storage"
                  name="systemRequirements-minimum-Storage"
                  value={formData.systemRequirements.minimum.Storage}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Network"
                  name="systemRequirements-minimum-Network"
                  value={formData.systemRequirements.minimum.Network}
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
                  value={formData.systemRequirements.recommended.CPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="RAM"
                  name="systemRequirements-recommended-RAM"
                  value={formData.systemRequirements.recommended.RAM}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="GPU"
                  name="systemRequirements-recommended-GPU"
                  value={formData.systemRequirements.recommended.GPU}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Operating System"
                  name="systemRequirements-recommended-OS"
                  value={formData.systemRequirements.recommended.OS}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="DirectX"
                  name="systemRequirements-recommended-DirectX"
                  value={formData.systemRequirements.recommended.DirectX}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Storage"
                  name="systemRequirements-recommended-Storage"
                  value={formData.systemRequirements.recommended.Storage}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Network"
                  name="systemRequirements-recommended-Network"
                  value={formData.systemRequirements.recommended.Network}
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
                  Create Game
                </Button>
              )}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateGameForm;
