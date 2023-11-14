import { useState } from 'react';
import React from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Dialog, Grid, Typography, Fade, CircularProgress } from '@mui/material';
import Link from "@mui/material/Link";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`,
})

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [codeWindow, setCodeWindow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleCodeSubmit = (event) => {
    event.preventDefault();

    if (code.length === 0) {
      setCodeError(true);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(true);
      return;
    }

    if (newPassword !== passwordAgain) {
      setPasswordsMatch(true);
      return;
    }

    axiosInstance.post('/user/verify-code', { email, code, newPassword })
      .then(() => {
        setCodeWindow(false);
        setErrorMessage("Your password has been changed.");
        setNavbarOpen(true);
        setQuery("progress");
        setTimeout(() => {
          navigate("/login");
          setQuery("");
        }, 1500);



      })
      .catch((error) => {
        if (error.response.status === 403) {
          setErrorMessage(error.response.data.message);
          setNavbarOpen(true);
        } else if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
          setNavbarOpen(true);
        }

      })
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.length === 0) {
      setEmailError(true);
      return;
    }

    axiosInstance.post('/user/reset-password', { email })
      .then(() => {
        setCodeWindow(true);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setErrorMessage("Email must be an email.");
              break;
            case 403:
              setErrorMessage("No user found with this email.");
              break;
            // Add more cases for other status codes as needed
            default:
              setErrorMessage("An unexpected error occurred.");
          }
        }

        setNavbarOpen(true);
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNavbarOpen(false);
  }

  return (
    <div style={{ backgroundColor: '#2F5B7A', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} >
      <Grid container spacing={2} sx={{ display: 'flex', direction: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={6} sx={{ backgroundColor: 'white', borderRadius: '25px' }}>
          <Box component="form" noValidate sx={{ m: 8 }}>
            <Typography component="h1" variant="h5">
              Forgot Your Password?
            </Typography>
            <Typography >
              Enter your email address and we will send you a code to reset your password.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              error={emailError}
              helperText={
                emailError ? "Required" : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#F49A32' }}
              onClick={handleSubmit}
            >
              Send
            </Button>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Link href="/login" variant="body2">
                  Remember your password? {"Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={codeWindow} onClose={() => setCodeWindow(false)}>
        {query === "progress" ? (
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        ) : (<Box component="form" noValidate sx={{ p: 5 }}>
          <Typography>
            Please check your email for the code and enter it below with your new password.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={codeError}
            helperText={codeError ? "Required" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={newPassword}
            id={passwordError ? "" : "outlined-error-helper-text"}
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordError(false);
              setNewPassword(e.target.value);
            }}
            error={passwordError}
            helperText={
              passwordError ? "Password must be at least 8 characters" : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password Again"
            type="password"
            value={passwordAgain}
            id={passwordsMatch ? "outlined-error-helper-text" : ""}
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordsMatch(false);
              setPasswordAgain(e.target.value);
            }}
            error={passwordsMatch}
            helperText={passwordsMatch ? "Passwords must match." : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#F49A32' }}
            onClick={handleCodeSubmit}
          >
            Change Your Password
          </Button>
        </Box>)}


      </Dialog>

      <Snackbar open={navbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={passwordError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div >


  );
}