import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from "@mui/material";
import { getAllMenuData } from "../api/getAllMenuData";
import { formatMessData } from "../utils/FormatMessData";
import { getMessMenuUpdatedNumber } from "../api/getMessMenuUpdatedNumber";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Menu() {
  const [menu_items_from_web, setMenu] = useState({});
  const [isLoading, setIsLoading] = useState(true);  // Added loading state

  const fetchMenuData = async () => {
    try {
      const res = await getAllMenuData();
      if (res.status === true) {
        let dd = formatMessData(res.data);
        console.log("Formatted Menu Data:", dd);
        localStorage.setItem("menu", JSON.stringify(dd)); 
        setMenu(dd); 
        console.log("API Called")
      } else {
        console.log("Error message from API:", res.msg);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setIsLoading(false);  // Set loading state to false once the data is fetched
    }
  };
  
  const fetchMenuUpdatedNumber = async () => {
    try {
      const vv = await getMessMenuUpdatedNumber();
      return vv; 
    } catch (error) {
      console.error("Error fetching menu updated number:", error);
      return 0; 
    }
  };
  
  const getData = async () => {
    const fetchedValue = await fetchMenuUpdatedNumber(); 
    const storedValue = parseInt(localStorage.getItem("isMenuUpdated") || "0", 10); 

    if (!storedValue || storedValue < fetchedValue || !localStorage.getItem("menu")) {
      await fetchMenuData();
      localStorage.setItem("isMenuUpdated", fetchedValue); 
    } else {
      const storedMenu = JSON.parse(localStorage.getItem("menu"));
      setMenu(storedMenu || {}); 
      setIsLoading(false);  // Set loading state to false if data is from local storage
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const navigate = useNavigate();

  if (isLoading) {
    // Display loader while data is being fetched
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/menu-change")}
        style={{ marginBottom: "20px" }}
      >
        Change Menu
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Breakfast</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>Snacks</TableCell>
              <TableCell>Dinner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, index) => (
              <TableRow key={index}>
                <TableCell>{day}</TableCell>
                <TableCell>{menu_items_from_web[day]?.breakFast || "N/A"}</TableCell>
                <TableCell>{menu_items_from_web[day]?.lunch || "N/A"}</TableCell>
                <TableCell>{menu_items_from_web[day]?.snacks || "N/A"}</TableCell>
                <TableCell>{menu_items_from_web[day]?.dinner || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
