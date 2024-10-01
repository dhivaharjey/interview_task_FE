import React, { useState } from "react";
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
  Link,
  Alert,
  IconButton,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const defaultTheme = createTheme();

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
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
      const { userName, email, password } = inputData;
      const response = await axios.post(`http://localhost:4000/user/register`, {
        userName,
        email,
        password,
      });
      if (response) {
        setInputData({});
        toast.success(response?.data?.message);
        navigate("/login");
      }
      console.log(response.data);
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={inputData.email}
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/login">
                  {"You alraedy have an account? Sign In"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserRegister;
