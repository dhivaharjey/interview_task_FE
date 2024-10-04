import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  // Function to check authentication
  const checkAuth = async () => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in local storage
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://interview-task-be.onrender.com/user/check-auth",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        }
      );
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setSessionExpired(true); // Set session expired if token is invalid
      localStorage.removeItem("token"); // Clear the token from local storage
      // Optionally navigate to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Call on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (sessionExpired) {
    return (
      <>
        <h2>Your session has expired. Please log in again.</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </>
    );
  }
  const logout = setTimeout(() => {
    <Navigate to="/login" />;
  }, 500000);
  return isAuthenticated ? element : logout;
};

export default ProtectedRoute;
