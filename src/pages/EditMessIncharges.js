import React, { useState } from "react";
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

function MessInchargesTable({ messDetails }) {
  const [details, setDetails] = useState(messDetails);

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleSave = () => {
    console.log("Updated Details:", details);
    alert("Details Saved!");
  };

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
          {details.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  fullWidth
                  value={row.messName}
                  onChange={(e) => handleInputChange(index, "messName", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={row.inchargeName}
                  onChange={(e) => handleInputChange(index, "inchargeName", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="center">
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
  const messDetails = [
    { messName: "Mess 1", inchargeName: "John Doe", phone: "1234567890" },
    { messName: "Mess 2", inchargeName: "Jane Smith", phone: "9876543210" },
    { messName: "Mess 3", inchargeName: "Mike Johnson", phone: "4561237890" },
    { messName: "Mess 4", inchargeName: "Emily Davis", phone: "7894561230" },
    { messName: "Mess 5", inchargeName: "John Doe", phone: "1234567890" },
    { messName: "Mess 6", inchargeName: "Jane Smith", phone: "9876543210" },
    { messName: "Mess 7", inchargeName: "Mike Johnson", phone: "4561237890" },
    { messName: "Mess 8", inchargeName: "Emily Davis", phone: "7894561230" },
    { messName: "Mess 9", inchargeName: "John Doe", phone: "1234567890" },
    { messName: "Mess 10", inchargeName: "Jane Smith", phone: "9876543210" },
  ];

  return <MessInchargesTable messDetails={messDetails} />;
}
