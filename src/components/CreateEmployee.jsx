import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  FormControl,
  MenuItem,
  Typography,
  Box,
  Container,
  CssBaseline,
  Grid,
  Avatar,
  Alert,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const theme = createTheme();

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value, type } = e.target;
  //   if (type === "file") {
  //     if (fileType !== "image/jpeg" && fileType !== "image/png") {
  //       alert("Please select a JPEG or PNG image.");
  //       e.target.value = "";
  //     }
  //     setFormData({ ...formData, image: e.target.files[0] });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };
  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (type === "file") {
      const file = e.target.files[0];

      if (file) {
        const fileType = file.type;

        if (fileType !== "image/jpeg" && fileType !== "image/png") {
          alert("Please select a JPEG or PNG image.");
          e.target.value = "";
          return; // Exit if the file type is invalid
        }

        setFormData({ ...formData, image: file }); // Set the valid image
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("mobileNumber", formData.mobileNumber);
      submissionData.append("designation", formData.designation);
      submissionData.append("gender", formData.gender);
      submissionData.append("course", formData.course);
      submissionData.append("image", formData.image);

      const response = await axios.post(
        `http://localhost:4000/employees/create-employee`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Employee created successfully");
        navigate("/dashboard/employee-list");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            <Add />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Employee
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{ mt: 1 }}
          >
            {errorMsg && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />

            <FormControl fullWidth margin="normal">
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Designation
                </MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>

            {/* Gender Section */}
            <FormControl component="fieldset" margin="normal" fullWidth>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Gender:
              </Typography>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>

            {/* Course Section */}

            <Typography
              variant="subtitle1"
              sx={{ marginTop: 2 }}
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Course:
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.course === "MCA"}
                    onChange={handleChange}
                    value="MCA"
                    name="course"
                  />
                }
                label="MCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.course === "BCA"}
                    onChange={handleChange}
                    value="BCA"
                    name="course"
                  />
                }
                label="BCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.course === "BSC"}
                    onChange={handleChange}
                    value="BSC"
                    name="course"
                  />
                }
                label="BSC"
              />
            </FormGroup>

            {/* Image Upload */}
            <TextField
              margin="normal"
              type="file"
              name="image"
              fullWidth
              onChange={handleChange}
              inputProps={{ accept: "image/jpeg, image/png" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Employee
            </Button>

            <Grid container>
              <Grid item>
                <Button
                  onClick={() => navigate("/dashboard/employee-list")}
                  color="secondary"
                >
                  View Employee List
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateEmployee;
