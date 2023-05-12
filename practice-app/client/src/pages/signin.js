import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const errorDiv = error 
  ? <div>
      {error}
    </div> 
  : '';
  let navigate = useNavigate();
  useEffect(()=> {
    if (authState.status) {
      navigate("/");
    }
  });

  const signIn = async () => {
    setError("");
    const data = {identifier: identifier, password: password};
    try {
      const loginResponse = await axios.post(`http://${process.env.REACT_APP_API_URL}/api/users/login`, data);
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
  );
};

export default SignIn;