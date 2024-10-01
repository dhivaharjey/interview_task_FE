import { ThemeProvider } from "@emotion/react";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  createTheme,
  Grid,
  Alert,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputData, setInputData] = useState({
    userName: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const { userName, password } = inputData;

      const response = await axios.post(
        `https://interview-task-be.onrender.com/user/login`,
        {
          userName,
          password,
        }
      );
      console.log(response);

      if (response.status == 200) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Display error message */}
            {errorMsg && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={inputData.userName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={inputData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/register">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserLogin;
