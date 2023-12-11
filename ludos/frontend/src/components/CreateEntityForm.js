import { Autocomplete, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
});



const CreateEntityForm = () => {
    const [searchKey, setSearchKey] = useState("");
    const [name, setName] = useState("");
    const [nameEmpty, setNameEmpty] = useState(false);
    const [games, setGames] = useState([]);
    const [game, setGame] = useState("");
    const [type, setType] = useState("");
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [serverError, setServerError] = useState(false);
    const [additionalProperties, setAdditionalProperties] = useState([{ name: '', value: '' }]);
    const [defaultProperties, setDefaultProperties] = useState([
        { name: 'Description', value: '' },
        { name: 'Image Link', value: '' },
    ]);
    const [defaultPropertyError, setDefaultPropertyError] = useState(false);


    const types = ["Character", "Environement", "Item", "Package"];

    useEffect(() => {
        const fetchGames = async () => {


            axiosInstance.get(`/game?searchKey=${searchKey}`)
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
        setAdditionalProperties([...additionalProperties, { name: '', value: '' }]);
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

    const handleDefaultPropertyChange = (index, field, value) => {

        if (value === "" || value === null) {
            setDefaultPropertyError(true);
        }

        const newProperties = [...defaultProperties];
        newProperties[index][field] = value;
        setDefaultProperties(newProperties);
        setDefaultPropertyError(false);
    };

    const formatContentForSubmission = () => {

        let content = [...defaultProperties, ...additionalProperties];
        const formattedContent = {};
        content.forEach(property => {
            if (property.name && property.value) {
                formattedContent[property.name] = property.value;
            }
        });
        return formattedContent;
    };

    const handleCloseSnackbar = () => {
        setSnackbar(false);
    };

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

        if (defaultProperties[0].value === "" || defaultProperties[1].value === "") {
            setDefaultPropertyError(true);
            setSnackbarMessage("Default properties cannot be empty!");
            setServerError(true);
            setSnackbar(true);
            return;
        }


        let gameId = games.filter((value) => value.title === game)[0].id;

        const data = {
            type: type.toLowerCase(),
            content: formatContentForSubmission(),
            name,
            gameId,
        };

        axiosInstance.post(`/entity/${gameId}`, data)
            .then((response) => {
                console.log(response);
                setSnackbarMessage("Entity created successfully.");
                setServerError(false);
                setSnackbar(true);
            })
            .catch((error) => {
                console.log(error);
                setServerError(true);
                setSnackbarMessage("An error occured while creating the entity.");
                setSnackbar(true);
            });
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={1} xs={8} sx={{ backgroundColor: 'white', padding: '15px', borderRadius: '25px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Create Entity</h1>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Name:</h3>
                    <TextField
                        label="Name of the Entity"
                        required
                        fullWidth
                        margin='auto'
                        id='name'
                        onChange={(event) => {
                            setName(event.target.value);
                            setNameEmpty(false);
                        }}
                        error={nameEmpty}
                        helperText={nameEmpty ? "Name cannot be empty." : ""}
                    />
                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Game:</h3>
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
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Entity Type:</h3>
                    <Autocomplete
                        disablePortal
                        onChange={(event, newValue) => {
                            setType(newValue);
                        }}
                        id="combo-box-demo"
                        options={types}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Type" />}
                    />

                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Entity Properties:</h3>
                    {/* Default properties */}
                    <Grid container spacing={2} style={{ display: 'flex', direction: 'row' }}>
                        <Grid item xs={5} my={1} style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="h6">Description:</Typography>
                        </Grid>
                        <Grid item xs={6} my={1}>
                            <TextField
                                fullWidth
                                required
                                label="Description"
                                value={defaultProperties[0].value}
                                onChange={(e) => handleDefaultPropertyChange(0, 'value', e.target.value)}
                                error={defaultPropertyError}
                                helperText={defaultPropertyError ? "Description cannot be empty." : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ display: 'flex', direction: 'row' }}>
                        <Grid item xs={5} my={1} style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="h6">Image Link:</Typography>
                        </Grid>
                        <Grid item xs={6} my={1}>
                            <TextField
                                fullWidth
                                required
                                label="Image Link"
                                value={defaultProperties[1].value}
                                onChange={(e) => handleDefaultPropertyChange(1, 'value', e.target.value)}
                                error={defaultPropertyError}
                                helperText={defaultPropertyError ? "Image link cannot be empty." : ""}
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
                                    onChange={(e) => handleAdditionalPropertyChange(index, 'name', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} my={1}>
                                <TextField
                                    fullWidth
                                    label="Property Value"
                                    value={property.value}
                                    onChange={(e) => handleAdditionalPropertyChange(index, 'value', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton onClick={() => removeAdditionalProperty(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <Button variant="contained" onClick={addAdditionalProperty} style={{ marginTop: '10px' }} >Add Property</Button>

                </Grid>
                <Grid item xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
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
}

export default CreateEntityForm;