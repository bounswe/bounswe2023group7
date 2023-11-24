import React from "react";
import { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [window, setWindow] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const axiosInstance = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_URL}`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        navigate("/");
        setWindow(false);
    };

    const handleChangepassword = (event) => {

        event.preventDefault();

        if (oldPassword.length === 0) {
            setOldPasswordError(true);
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError(true);
            return;
        }

        if (newPassword !== newPasswordAgain) {
            setPasswordsMatch(true);
            return;
        }

        axiosInstance
            .put("/user/change-password", {
                oldPassword,
                newPassword,
            })
            .then(() => {
                alert("Password changed successfully.");
                navigate("/")
                setWindow(false);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });

    }

    return (
        <Dialog open={window} onClose={handleClose}>
            <DialogTitle>Change Your Password</DialogTitle>
            <DialogContent>
                <DialogContentText marginBottom={3}>
                    To change your password, please enter your old password and your new password.
                    If you do not remember your old password, you can reset your password.
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="oldPassword"
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                        setOldPassword(e.target.value);
                        setOldPasswordError(false);
                    }}
                    error={oldPasswordError}
                    helperText={oldPasswordError ? "Old password cannot be empty." : ""}
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                    <TextField
                        id="newPassword"
                        label="New Password"
                        variant="outlined"
                        required
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        error={passwordError}
                        helperText={passwordError ? "New password should be eight character or longer" : ""}
                        onChange={(e) => {
                            setPasswordError(false);
                            setNewPassword(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth margin="normal">
                    <TextField
                        id="passwordAgain"
                        label="Confirm New Password"
                        variant="outlined"
                        required
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        error={passwordsMatch}
                        helperText={passwordsMatch ? "Passwords should match" : ""}
                        onChange={(e) => {
                            setPasswordsMatch(false);
                            setNewPasswordAgain(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions >
                <Link href="/forgot-password" variant="body2" color="#F49A32" marginLeft={2}>
                    Forgot password?
                </Link>
                <div style={{ flex: '1 0 0' }} />
                <Button onClick={handleClose} sx={{ color: '#F49A32' }}>Cancel</Button>
                <Button onClick={handleChangepassword} sx={{ color: '#F49A32' }}>Change Password</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordPage;