import { React, useState } from "react";
import { Button, TextField, Typography, Container, Grid, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import axios from "axios";


export default function SignUp() {

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const axiosInstance = axios.create({
        baseURL: 'http://3.125.225.39:8080', // Replace with your server's base URL
    });

    function handleSignUp() {

        axiosInstance.post('/user', { username, email, password })
            .then((response) => {
                setOpen(true);
            })
            .catch((error) => {
                console.error('Sign-up error: ', error);
            });

    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Grid container spacing={4} style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                marginLeft: '20px',
                marginRight: '20px'
            }}>
                <Grid item xs={12} md={6} alignItems="center">
                    <img
                        src="/logo.png"
                        alt="Gamer"
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                    />
                </Grid>
                <Grid item xs={12} md={6} container spacing={2} justifyContent="center" direction="column">
                    <Typography variant="h4" align="center">Login</Typography>

                    <form>
                        <Grid container spacing={2} direction="column" justifyContent="space-evenly">
                            <Grid item xs={12} md={9}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>

            {/* Başarılı Sign-up Bildirimi */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congratulations! Sign-up was successful.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
