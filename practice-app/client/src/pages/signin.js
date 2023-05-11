import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const errorDiv = error 
  ? <div className="error">
      {error}
    </div> 
  : '';
  let navigate = useNavigate();

  const signIn = async () => {
    setError("");
    const data = {identifier: identifier, password: password};
    console.log(data);
    try {
      const loginResponse = await axios.post("http://localhost:8080/api/users/login", data);
      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      setAuthState({
        status: true
      });
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
    }
  }
return (
    <div className="authenticationContainer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20vh',
          heigth: '100vh',
          padding: '2rem',
          color: 'dark grey',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}
        >
      <label>Username or Email</label>
      <input
        type="text"
        onChange={(event) => {
          setIdentifier(event.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {errorDiv}
      <button onClick={signIn}> Sign In </button>
      </Box>
      </Box>
    </div>
  );};

export default SignIn;