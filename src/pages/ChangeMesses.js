import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { getAllMessses, getInitialMessesAllocation,setMessAllocation } from "../api/getMessInchargeDetails";

const ChangeMessesTable = ({ messData, messOptions, onSave }) => {
  const [data, setData] = useState(messData);

  const handleChange = (key, value) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Data:", data);
    onSave(data);
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
              <Button variant="outlined" color="secondary" onClick={handleSave}>
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
  const [messData, setMessData] = useState({});
  const [messOptions, setMessOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const messesOptions = await getAllMessses();
      const messesInitialData = await getInitialMessesAllocation(); 
      
      setMessOptions(messesOptions);
      setMessData(messesInitialData);
    } catch (error) {
      console.error("Error fetching mess data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave =async (updatedData) => {
    await setMessAllocation(updatedData)
    console.log("Final saved data:", updatedData);
   
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ mt: 3 }}>
        Change Mess Assignments
      </Typography>
      <ChangeMessesTable messData={messData} messOptions={messOptions} onSave={handleSave} />
    </div>
  );
};

export default ChangeMesses;
