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
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const CreateGroupThreadForm = ({ group, game }) => {
    const [tags, setTags] = useState([]);
    const [currTag, setCurrTag] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [media, setMedia] = useState([]);
    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState("normal");
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [serverError, setServerError] = useState(false);
    const [titleEmpty, setTitleEmpty] = useState(false);
    const [bodyEmpty, setBodyEmpty] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = axiosInstance
                    .post("/external/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        setSnackbarMessage("Image uploaded successfully!");
                        setSnackbar(true);
                        setMedia((oldMedia) => [...oldMedia, response.data]);

                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                    });
                console.log("File is successfully uploaded:", response.data);
            } catch (error) {
                console.error("Error while uploading:", error);
                setSnackbarMessage("An error occurred while uploading the image!");
                setServerError(true);
            }
        }
    };

    const handleChange = (e) => {
        setCurrTag(e.target.value);
    };

    const handleRemoveImage = () => {
        setMedia([]);
        setPreviewUrl(null);
    }

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
        }

        if (body.length === 0 || body === "") {
            setSnackbarMessage("Body cannot be empty!");
            setServerError(true);
            setBodyEmpty(true);
            setSnackbar(true);
            return;
        }

        let gameId = game?.id;

        axiosInstance
            .post("/post", {
                title,
                body,
                gameId,
                groupId: group.id,
                media,
                tags,
            })
            .then((response) => {
                setSnackbarMessage("Thread created successfully!");
                setSnackbar(true);
                navigate(`/thread/${response.data.id}`);
                console.log(response);
            })
            .catch((error) => {
                setSnackbarMessage(
                    "An error occurred while creating the thread!: " +
                    error.response.data.message,
                );
                setServerError(true);
                console.log(error);
            });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", height: "90%" }}>
            <Grid
                container
                spacing={1}
                xs={12}
                sx={{ backgroundColor: "white", borderRadius: "25px" }}
            >
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
                    <h3 style={{ display: "flex", alignItems: "flex-start" }}>Game:</h3>
                    <Autocomplete
                        value={game?.title} // replace with your value
                        options={[]} // no options as user can't change the value
                        disabled
                        renderInput={(params) => <TextField {...params} label="Game" />} // replace "Your Label" with your label
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
                        Content:
                    </h3>
                    <FormControl fullWidth>
                        <Textarea
                            placeholder="Content"
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

                    {previewUrl && (
                        <div key={previewUrl} style={{ display: 'inline-block' }}>
                            <h3 style={{ display: "flex", alignItems: "flex-start" }}>
                                Image:
                            </h3>
                            <img src={previewUrl} alt="preview" style={{ maxHeight: '300px' }} />
                            <Button
                                onClick={handleRemoveImage}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "10px",
                                    color: "white",
                                    backgroundColor: "red",
                                }}
                            >
                                Remove Image
                            </Button>
                        </div>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    spacing={1}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Button
                        component="label"
                        variant="secondary"
                        sx={{
                            height: "40px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </Button>
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

export default CreateGroupThreadForm;
