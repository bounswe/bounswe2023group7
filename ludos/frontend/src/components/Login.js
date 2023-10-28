import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState('');
    const [serverError, setServerError] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const axiosInstance = axios.create({
        baseURL: 'http://3.125.225.39:8080'
    })

    const handleLogin = (event) => {

        if (password.length === 0 || password === '') {
            setPasswordEmpty(true);
            return;
        }


        event.preventDefault();
        axiosInstance.post('/user/login', { username, password })
            .then((response) => {
                const token = response.data.token;
                setDialogMessage('You have succesfully logged in.')
                setOpen(true)
            })
            .catch((error) => {
                console.error('Login error: ', error);

                let errorMessage = 'An error occurred.';
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            errorMessage = 'Email must be an email.';
                            break;
                        case 401:
                            errorMessage = 'Email or password is not correct.';
                            break;
                        // Add more cases for other status codes as needed
                        default:
                            errorMessage = 'An unexpected error occurred.';
                    }
                }

                setServerError(true);
                setDialogMessage(errorMessage);
                setOpen(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(../assets/logo.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 25,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#569CB1' }}>
                            <LoginIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => {
                                    setUsernameEmpty(false)
                                    setUsername(e.target.value)
                                }}
                                error={passwordEmpty}
                                helperText={passwordEmpty ? 'Password cannot be empty.' : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPasswordEmpty(false)
                                    setPassword(e.target.value)
                                }}
                                error={passwordEmpty}
                                helperText={passwordEmpty ? 'Password cannot be empty.' : ''}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose}
                    severity={serverError ? 'error' : "success"}
                    sx={{ width: '100%' }}>
                    {dialogMessage}
                </Alert>
            </Snackbar>

        </ThemeProvider>
    );
}