import { Autocomplete, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

const CreateEntityForm = ({ entity }) => {
  const [searchKey, setSearchKey] = useState("");
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [games, setGames] = useState([]);
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [serverError, setServerError] = useState(false);
  const [additionalProperties, setAdditionalProperties] = useState([
    { name: "", value: "" },
  ]);
  const [defaultProperties, setDefaultProperties] = useState([
    { name: "image", value: "" },
  ]);
  const [imageError, setImageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [entityImage, setEntityImage] = useState("");
  const navigate = useNavigate();

  const types = ["Character", "Environment", "Item", "Package"];

  useEffect(() => {
    if (entity) {
      console.log("Received entity for editing:", entity);
      setName(entity.name);
      setType(entity.type);
      setDescription(entity.description);
      setGame(entity.game?.title);
      setEntityImage(entity.content?.image);
      if (entity.content?.image) {
        setImageError(false);
      }
      const additionalProps = Object.keys(entity.content || {})
        .filter((key) => !["image"].includes(key))
        .map((key) => ({ name: key, value: entity.content[key] }));
      setAdditionalProperties(additionalProps);

      console.log("Set description to:", entity.type);
    }
  }, [entity]);

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

  const addAdditionalProperty = () => {
    setAdditionalProperties([...additionalProperties, { name: "", value: "" }]);
  };

  const handleAdditionalPropertyChange = (index, field, value) => {
    const newProperties = [...additionalProperties];
    newProperties[index][field] = value;
    setAdditionalProperties(newProperties);
  };

  const removeAdditionalProperty = (index) => {
    const newProperties = [...additionalProperties];
    newProperties.splice(index, 1);
    setAdditionalProperties(newProperties);
  };

  const handleImageLinkChange = (index, field, value) => {
    if (value === "" || value === null) {
      setImageError(true);
    }

    const newProperties = [...defaultProperties];
    newProperties[index][field] = value;
    setDefaultProperties(newProperties);
    setImageError(false);
  };

  const handleDescriptionChange = (value) => {
    if (value === "" || value === null) {
      setDescriptionError(true);
    }

    setDescription(value);
    console.log(defaultProperties);
    setDescriptionError(false);
  };

  const formatContentForSubmission = () => {
    let content = [...defaultProperties, ...additionalProperties];
    const formattedContent = {};
    content.forEach((property) => {
      if (property.name && property.value) {
        formattedContent[property.name] = property.value;
      }
    });
    return formattedContent;
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const isEditing = entity != null;
  const handleSubmit = () => {
    if (name === "") {
      setNameEmpty(true);
      return;
    }

    if (!game || game.length === 0 || game === "") {
      setSnackbarMessage("Game cannot be empty!");
      setServerError(true);
      setSnackbar(true);
      return;
    }

    if (description === "" || description === null) {
      setDescriptionError(true);
      setSnackbarMessage("Description cannot be empty!");
      setServerError(true);
      setSnackbar(true);
      return;
    }

    if (
      defaultProperties[0].value === "" ||
      defaultProperties[0].value === null
    ) {
      if (entity?.content.image == null || entity?.content.image == "") {
        setImageError(true);
        setSnackbarMessage("Image Link cannot be empty!");
        setServerError(true);
        setSnackbar(true);
        return;
      } else {
        defaultProperties[0].value = entity?.content.image;
      }
    }

    let gameId = games.filter((value) => value.title === game)[0].id;

    const data = {
      type: type.toLowerCase(),
      content: formatContentForSubmission(),
      name,
      gameId,
      description,
    };

    const method = isEditing ? "put" : "post";
    const url = isEditing ? `/entity/${entity.id}` : `/entity/${gameId}`;

    axiosInstance[method](url, data)
      .then((response) => {
        console.log(response);
        if (isEditing) {
          setSnackbarMessage("Entity edited successfully.");
        } else {
          setSnackbarMessage("Entity created successfully.");
        }

        setServerError(false);
        setSnackbar(true);
        if (isEditing) {
          navigate(`/entity/${entity.id}`);
        } else {
          navigate(`/entity/${response.data.id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(true);
        setSnackbarMessage("An error occured while creating the entity.");
        setSnackbar(true);
      });
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          {isEditing ? "Edit Entity" : "Create Entity"}
        </h1>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>Name:</h3>
          <TextField
            label="Name of the Entity"
            required
            value={name}
            fullWidth
            margin="auto"
            id="name"
            onChange={(event) => {
              setName(event.target.value);
              setNameEmpty(false);
            }}
            error={nameEmpty}
            helperText={nameEmpty ? "Name cannot be empty." : ""}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>Game:</h3>
          <Autocomplete
            value={game}
            onChange={(event, game) => {
              setGame(game);
            }}
            options={games.map((game) => game.title)}
            onInputChange={(event, newInputValue) => {
              setSearchKey(newInputValue);
            }}
            required
            renderInput={(params) => <TextField {...params} label="Game" />}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>
            Entity Type:
          </h3>
          <Autocomplete
            disablePortal
            value={capitalizeFirstLetter(type)}
            onChange={(event, newValue) => {
              setType(newValue);
            }}
            id="combo-box-demo"
            options={types}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <h3 style={{ display: "flex", alignItems: "flex-start" }}>
            Entity Properties:
          </h3>
          {/* Default properties */}
          <Grid
            container
            spacing={2}
            style={{ display: "flex", direction: "row" }}
          >
            <Grid
              item
              xs={5}
              my={1}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography variant="h6">Description:</Typography>
            </Grid>
            <Grid item xs={6} my={1}>
              <TextField
                fullWidth
                required
                multiline
                minRows={4}
                label="Description"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                error={descriptionError}
                helperText={
                  descriptionError ? "Description cannot be empty." : ""
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", direction: "row" }}
          >
            <Grid
              item
              xs={5}
              my={1}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography variant="h6">Image Link:</Typography>
            </Grid>
            <Grid item xs={6} my={1}>
              <TextField
                fullWidth
                required
                label="Image Link"
                value={
                  defaultProperties[0].value
                    ? defaultProperties[0].value
                    : entity?.content.image
                }
                onChange={(e) =>
                  handleImageLinkChange(0, "value", e.target.value)
                }
                error={imageError}
                helperText={imageError ? "Image link cannot be empty." : ""}
              />
            </Grid>
          </Grid>
          {/* Additional properties */}
          {additionalProperties.map((property, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={5} my={1}>
                <TextField
                  fullWidth
                  label="Property Name"
                  value={property.name}
                  onChange={(e) =>
                    handleAdditionalPropertyChange(
                      index,
                      "name",
                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid item xs={6} my={1}>
                <TextField
                  fullWidth
                  label="Property Value"
                  value={property.value}
                  onChange={(e) =>
                    handleAdditionalPropertyChange(
                      index,
                      "value",
                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={() => removeAdditionalProperty(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Button
            variant="contained"
            onClick={addAdditionalProperty}
            style={{ marginTop: "10px" }}
          >
            Add Property
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          spacing={1}
          sx={{ display: "flex", justifyContent: "flex-end" }}
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

export default CreateEntityForm;
