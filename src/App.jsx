import React from "react";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./utils/auth";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeList from "./components/EmployeeList";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route
            path="/dashboard/*"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            <Route index element={<Home />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="create-employee" element={<CreateEmployee />} />
            <Route path="edit-employee/:id" element={<EditEmployee />} />
          </Route>
        </Routes>
        <Route path="*" element={<UserLogin />} />
      </Router>
    </>
  );
};

export default App;
