import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";


const ChangeMessesTable = ({ messData, messOptions }) => {
  const [data, setData] = useState(messData);

  const handleChange = (key, value) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Data:", data);
    alert("Mess assignments updated successfully!");
  };

  const groupedKeys = Object.keys(data).reduce((acc, key, index) => {
    if (index % 2 === 0) {
      acc.push([key, Object.keys(data)[index + 1]]);
    }
    return acc;
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Group 1</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Assigned Mess</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Group 2</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Assigned Mess</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedKeys.map(([key1, key2], index) => (
            <TableRow key={index}>
              <TableCell>{key1}</TableCell>
              <TableCell>
                <Select
                  value={data[key1]}
                  onChange={(e) => handleChange(key1, e.target.value)}
                  fullWidth
                  variant="outlined"
                  size="small"
                >
                  {messOptions.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              {key2 && (
                <>
                  <TableCell>{key2}</TableCell>
                  <TableCell>
                    <Select
                      value={data[key2]}
                      onChange={(e) => handleChange(key2, e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                    >
                      {messOptions.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Button variant="contained" color="secondary" onClick={handleSave}>
                Save Changes
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ChangeMesses = () => {
  const initial = {
    P1Boys: "Mess1",
    P1Girls: "Mess2",
    P2Boys: "Mess3",
    P2Girls: "Mess4",
    E1Boys: "Mess5",
    E1Girls: "Mess6",
    E2Boys: "Mess7",
    E2Girls: "Mess8",
    E3Boys: "Mess9",
    E3Girls: "Mess10",
    E4Boys: "Mess1",
    E4Girls: "Mess2",
  };

  const messOptions = [
    "Mess1",
    "Mess2",
    "Mess3",
    "Mess4",
    "Mess5",
    "Mess6",
    "Mess7",
    "Mess8",
    "Mess9",
    "Mess10",
  ];

  return (
    <div>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Change Mess Assignments
        </Typography>
        <ChangeMessesTable messData={initial} messOptions={messOptions} />
      </div>

      
    
  );
};

export default ChangeMesses;
