import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:4000/user/user-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          setData(response.data.user);
        }
      } catch (error) {
        console.error(
          "Error fetching employee data:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("successfully Loged out!!");
  };
  console.log(data);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data.userName}
          </Typography>

          {/* Home Button */}
          <Button color="inherit" component={Link} to="/dashboard">
            Home
          </Button>

          {/* Employee List Button */}
          <Button
            color="inherit"
            onClick={() => navigate("/dashboard/employee-list")}
          >
            Employee List
          </Button>

          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Dashboard;
