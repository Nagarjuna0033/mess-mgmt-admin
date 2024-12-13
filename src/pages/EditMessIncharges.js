import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import {getAllInchargeDetails} from "../api/getMessInchargeDetails"

function MessInchargesTable({ messDetails }) {
  const [details, setDetails] = useState(messDetails);

  // Ensure the details prop is updated when messDetails changes
  useEffect(() => {
    setDetails(messDetails);
  }, [messDetails]);

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  // Save updated details using POST request with axios
  const handleSave = async () => {
    try {
      console.log("Updated Details:", details);

      const response = await axios.post(
        "https://us-central1-mess-management-250df.cloudfunctions.net/editMessIncharge",
        details
      );

      console.log("Response:", response.data);
      alert("Details Saved!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save details!");
    }
  };

  console.log("Rendering details:", details); // Debug log to ensure data is passed and updated correctly

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mess Name</TableCell>
            <TableCell>Incharge Name</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details && details.length > 0 ? (
            details.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row.messName}
                    onChange={(e) =>
                      handleInputChange(index, "messName", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row.InchargeName}
                    onChange={(e) =>
                      handleInputChange(index, "InchargeName", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button variant="contained" color="secondary" onClick={handleSave}>
                Save All Changes
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function MessInchargePage() {
  const [messDetails, setMess] = useState([]);

  const getData = async () => {
    try {
      const res = await getAllInchargeDetails(); // Assuming getAllInchargeDetails is working
      console.log("Fetched data:", res); // Ensure the response is in expected format
      setMess(res); // Set the data to state
    } catch (error) {
      console.error("Error fetching mess details:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on page load
  }, []);

  return <MessInchargesTable messDetails={messDetails} />;
}
