import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();
const backgroundImage = require("../assets/logo.png");

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://3.125.225.39:8080",
  });

  const handleSignup = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setPasswordError(true);
      return;
    }

    if (password !== passwordAgain) {
      setPasswordsMatch(true);
      return;
    }

    axiosInstance
      .post("/user", { email, username, password })
      .then((response) => {
        const accessToken = response.data.token;
        localStorage.setItem("accessToken", accessToken);

        navigate("/");
        setDialogMessage("You have succesfully signed up.");
        setOpen(true);
      })
      .catch((error) => {
        console.error("Signup error: ", error);

        let errorMessage = "An error occurred.";
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = "Email must be an email.";
              break;
            case 409:
              errorMessage = "This email or username is already registered.";
              break;
            // Add more cases for other status codes as needed
            default:
              errorMessage = "An unexpected error occurred.";
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#0C1929",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={backgroundImage}
              color="white"
              style={{ width: "auto", height: "500px", display: "flex" }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            height: "%100",
            width: "%100",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2F5B7A",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "25px",
              margin: 5,
            }}
          >
            <Avatar sx={{ m: 5, bgcolor: "#F49A32" }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, mx: 10 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                id={passwordError ? "" : "outlined-error-helper-text"}
                autoComplete="current-password"
                onChange={(e) => {
                  setPasswordError(false);
                  setPassword(e.target.value);
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
                sx={{ mt: 3, mb: 2, backgroundColor: "#F49A32" }}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Grid
                container
                sx={{
                  my: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <Link href="/login" variant="body2" color={"#F49A32"}>
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={serverError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {dialogMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
