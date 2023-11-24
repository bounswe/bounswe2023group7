import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Grid, Box, FormControl, Chip, Input } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import Textarea from '@mui/joy/Textarea';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';


const CreatePostPage = () => {
    const [tags, setTags] = useState(["test"]);
    const [currTag, setCurrTag] = useState("");
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [media, setMedia] = useState([]);
    const [value, setValue] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const handleFileUpload = (e) => {
        setMedia(e.target.files[0]);
    };

    const handleChange = (e) => {
        setCurrTag(e.target.value);
    };

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

    const handleDeleteTag = (item, index) => {
        let arr = [...tags]
        arr.splice(index, 1)
        console.log(item)
        setTags(arr)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let gameId = games.filter((game) => game.title === value)[0].id;

        axiosInstance.post('/post', {
            title,
            body,
            gameId,
            media,
            tags,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '90%' }}>
            <Grid container spacing={1} xs={8} sx={{ backgroundColor: 'white', padding: '15px', borderRadius: '25px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Create Post</h1>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Title:</h3>
                    <TextField
                        label="Title"
                        required
                        fullWidth
                        margin='auto'
                        id='title'
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }} />
                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Game:</h3>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        options={games.map((game) => game.title)}
                        onInputChange={(event, newInputValue) => {
                            setSearchKey(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Forum" />}
                    />
                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Tags:</h3>
                    <FormControl sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        border: '2px solid lightgray',
                        padding: 1,
                        borderRadius: '4px',
                    }}>
                        <div className={"container"}>
                            {tags.map((item, index) => (
                                <Chip key={index} size="small" onDelete={() => handleDeleteTag(item, index)} label={item} />
                            ))}
                        </div>
                        <Input
                            value={currTag}
                            onChange={handleChange}
                            onKeyDown={handleKeyUp}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Content:</h3>
                    <FormControl fullWidth>
                        <Textarea
                            placeholder="Content"
                            minRows={5}
                            endDecorator={<Box
                                sx={{
                                    display: 'flex',
                                    gap: 'var(--Textarea-paddingBlock)',
                                    pt: 'var(--Textarea-paddingBlock)',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    flex: 'auto',
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
                                    sx={{ '--ListItemDecorator-size': '24px' }}
                                >
                                    {['200', 'normal', 'bold'].map((weight) => (
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
                                            {weight === '200' ? 'lighter' : weight}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <IconButton
                                    variant={italic ? 'soft' : 'plain'}
                                    color={italic ? 'primary' : 'neutral'}
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
                                fontStyle: italic ? 'italic' : 'initial',
                            }}
                            onChange={(event) => {
                                setBody(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        my={10}
                        sx={{ mt: 5 }}
                        endIcon={<UploadFileIcon />}

                    >
                        Add Image
                        <input type="file" accept=".png" hidden onChange={handleFileUpload} />
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

        </Box>
    );
};

export default CreatePostPage;
