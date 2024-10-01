import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Box,
  Container,
  CssBaseline,
  Grid,
  Avatar,
  Alert,
  FormLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const theme = createTheme();

const EditEmployee = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/employees/get-employee/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        setFormData(response.data);
      } catch (error) {
        setErrorMsg("Error fetching employee details.");
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (name === "course") {
      setFormData({ ...formData, course: value });
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

      const response = await axios.put(
        `http://localhost:4000/employees/update-employee/${id}`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("Employee updated successfully");
        navigate("/dashboard/employee-list");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("An error occurred while updating the employee.");
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
            Edit Employee
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

            {/* Name */}
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Mobile */}
            <TextField
              margin="normal"
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />

            {/* Designation */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={formData.designation || ""}
                onChange={handleChange}
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>

            {/* Gender */}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender || ""}
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

            {/* Course */}
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
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
              InputProps={{ accept: "image/jpeg, image/png" }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
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

export default EditEmployee;
