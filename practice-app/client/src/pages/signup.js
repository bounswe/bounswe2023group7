import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Box from '@mui/material/Box';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const errorDiv = error 
  ? <div className="error">
      {error}
    </div> 
  : '';
  let navigate = useNavigate();

  const signUp = async () => {
    setError("");
    const data = {username: username, email: email, password: password};
    try {
      await axios.post("http://localhost:8080/api/users/signup", data);
      const loginResponse = await axios.post("http://localhost:8080/api/users/login",{identifier: data.email, password: data.password});
      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      setAuthState({
        status: true
      });
      console.log("loginResponse.data.accessToken");
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
      <label>Username</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
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
      <button onClick={signUp}> Sign Up </button>
      </Box>
      </Box>
    </div>
  );

};

export default SignUp;