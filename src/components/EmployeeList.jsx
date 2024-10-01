import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Add, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDeleteEmployee = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:4000/employees/delete-employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        toast.success("Employee Deleted successfully");
      }
      setData((prevData) => prevData.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:4000/employees/get-employee-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(
          "Error fetching employee data:",
          error.response?.data || error.message
        );
      }
    };

    fetchEmployeeData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <ArrowDropUp fontSize="small" />
      ) : (
        <ArrowDropDown fontSize="small" />
      );
    }
    return null;
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Enter Search Keyword"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "75%", margin: "10px 0px" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "20%",
            marginRight: "20px",
            padding: "10px 0",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => navigate("/dashboard/create-employee")}
        >
          <Typography style={{ marginRight: "3px" }}>
            Create Employee
          </Typography>
          <Add />
        </Button>
      </Box>

      {data.length === 0 ? (
        <Typography variant="h6" align="center">
          No employees found. Please add an employee.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => requestSort("id")}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bolder",
                    width: "90px",
                  }}
                >
                  Unique Id
                  {renderSortArrow("id")}
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Image</TableCell>
                <TableCell
                  onClick={() => requestSort("name")}
                  style={{ cursor: "pointer", fontWeight: "bolder" }}
                >
                  Name
                  {renderSortArrow("name")}
                </TableCell>
                <TableCell
                  onClick={() => requestSort("email")}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bolder",
                  }}
                >
                  Email
                  {renderSortArrow("email")}
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>
                  Mobile No
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>
                  Designation
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Gender</TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Course</TableCell>
                <TableCell
                  onClick={() => requestSort("createdAt")}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bolder",
                    width: "150px",
                  }}
                >
                  Create Date
                  {renderSortArrow("createdAt")}
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee._id}</TableCell>
                  <TableCell>
                    {employee.image ? (
                      <img
                        src={`http://localhost:4000/${employee.image}`}
                        alt={employee.name}
                        style={{ width: 30, height: 30 }}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobileNumber}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.course}</TableCell>
                  <TableCell>{employee.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: "5px" }}
                      onClick={() =>
                        navigate(`/dashboard/edit-employee/${employee._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EmployeeList;
