import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Welcome to Admin DashBoard</Typography>
      </Box>
    </>
  );
};

export default Home;
