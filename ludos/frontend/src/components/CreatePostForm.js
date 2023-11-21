import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePostPage = () => {
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchKey, setSearchKey] = useState('');

    const axiosInstance = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_URL}`,
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance.post('/post', {
            title,
            content,
            searchKey,
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
                        options={games.map((game) => game.title)}
                        onInputChange={(event, newInputValue) => {
                            setSearchKey(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Forum" />}
                    />
                </Grid>
                <Grid item xs={12} spacing={1} >
                    <h3 style={{ display: 'flex', alignItems: 'flex-start' }}>Content:</h3>
                    <ReactQuill theme="snow" value={content} onChange={setContent} style={{ marginBottom: '10px', height: '300px' }} />
                </Grid>
                <Grid item xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        my={10}
                        sx={{ mt: 5 }}
                        endIcon={<SendIcon />}
                    >
                        Add Image

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
