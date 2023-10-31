import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const defaultTheme = createTheme();
const backgroundImage = require("../assets/logo.png");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState("");
  const [serverError, setServerError] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}`,
  });

  const handleLogin = (event) => {
    if (username.length === 0 || username === "") {
      setUsernameEmpty(true);
      return;
    }

    if (password.length === 0 || password === "") {
      setPasswordEmpty(true);
      return;
    }

    event.preventDefault();
    axiosInstance
      .post("/user/login", { username, password })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);

        navigate("/home");
        setDialogMessage("You have succesfully logged in.");
        setOpen(true);
      })
      .catch((error) => {
        console.error("Login error: ", error);

        let errorMessage = "An error occurred.";
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = "Email must be an email.";
              break;
            case 401:
              errorMessage = "Username or password is not correct.";
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 25,
            }}
          >
            <img
              src={backgroundImage}
              color="white"
              style={{
                width: "auto",
                height: "500px",
                display: "flex",
                margin: "auto",
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            objectFit: "contain",
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
            <Box
              sx={{
                margin: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 2, bgcolor: "#F49A32" }}>
                <LoginIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => {
                    setUsernameEmpty(false);
                    setUsername(e.target.value);
                  }}
                  error={usernameEmpty}
                  helperText={usernameEmpty ? "Username cannot be empty." : ""}
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
                    setPasswordEmpty(false);
                    setPassword(e.target.value);
                  }}
                  error={passwordEmpty}
                  helperText={passwordEmpty ? "Password cannot be empty." : ""}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#F49A32" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                  }}
                >
                  <Grid
                    item
                    xs
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Link href="#" variant="body2" color="#F49A32">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Link href="/signup" variant="body2" color="#F49A32">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
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
