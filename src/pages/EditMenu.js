import React, { useState, useEffect } from "react";
import { getAllMenuData } from "../api/getAllMenuData";
import { FormatMessData } from "../utils/formatMessData";
import { getMessMenuUpdatedNumber } from "../api/getMessMenuUpdatedNumber";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
  Chip,
} from "@mui/material";

const availableItems = [
  "Bread Butter",
  "Chapati",
  "Chutney",
  "Coffee",
  "Curd",
  "Daal",
  "Dosa",
  "Fried Rice",
  "Fruit Salad",
  "Idli",
  "Milk",
  "Pickle",
  "Pongal",
  "Poori",
  "Raita",
  "Rice",
  "Sambar",
  "Tea",
  "Upma",
  "Uttapam",
  "Vegetable Curry",
];

function EditMenuTable({ menus, onMenuChange, onSubmit }) {
  return (
    
    <TableContainer component={Paper} style={{ margin: "20px 0" }}>
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
          {menus.map((menu, dayIndex) => (
            <TableRow key={dayIndex}>
              <TableCell>{menu.day}</TableCell>
              {["breakFast", "lunch", "snacks", "dinner"].map((mealType) => (
                <TableCell key={mealType}>
                  <Select
                    multiple
                    fullWidth
                    value={menu[mealType]}
                    onChange={(e) => onMenuChange(e, dayIndex, mealType)}
                    renderValue={(selected) => (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            style={{ margin: 2 }}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {availableItems.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="center">
              <Button variant="outlined" color="secondary" onClick={onSubmit}>
                Submit Changes
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function EditMenu() {
  const fetchMenuUpdatedNumber = async () => {
      try {
        const vv = await getMessMenuUpdatedNumber();
        return vv; 
      } catch (error) {
        console.error("Error fetching menu updated number:", error);
        return 0; 
      }
    };

  const preprocessMenuItems = (menuData) => {
    return Object.keys(menuData).map((day) => {
      const { breakFast, lunch, snacks, dinner } = menuData[day];
      return {
        day,
        breakFast: breakFast.split(",").map((item) => item.trim()),
        lunch: lunch.split(",").map((item) => item.trim()),
        snacks: snacks.split(",").map((item) => item.trim()),
        dinner: dinner.split(",").map((item) => item.trim()),
      };
    });
  };

  const fetchMenuData = async () => {
    try {
        console.log("API Called")
        const res = await getAllMenuData();
        if (res.status === true) {
          const formattedMenu = FormatMessData(res.data);
          const menuItems = preprocessMenuItems(formattedMenu);
          console.log("Fetched and formatted menu data:", menuItems);
          setMenus(menuItems);
          localStorage.setItem("menuData", JSON.stringify(menuItems));
        } else {
          console.log(res.msg);
        }
      
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const getData = async () => {
    const fetchedValue = await fetchMenuUpdatedNumber(); 
    const storedValue = parseInt(localStorage.getItem("isEditMenuUpdated") || "0", 10); 

  
    if (!storedValue || storedValue < fetchedValue || !localStorage.getItem("menuData")) {
      await fetchMenuData();
      localStorage.setItem("isEditMenuUpdated", fetchedValue); 
    } else {
      const storedMenu = JSON.parse(localStorage.getItem("menuData"));
      setMenus(storedMenu || {}); 
    }
  };

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    
    getData();
  }, []);

  const handleInputChange = (e, dayIndex, mealType) => {
    const updatedMenus = [...menus];
    updatedMenus[dayIndex][mealType] = e.target.value;
    setMenus(updatedMenus);
    localStorage.setItem("menuData", JSON.stringify(updatedMenus)); // Save to localStorage
  };

  const handleSubmit = async () => {
    try {
      console.log(menus)
        // Make the API call to update the menu on the server
        const response = await fetch("https://us-central1-mess-management-250df.cloudfunctions.net/addMessMenu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(menus),
        });

        // Check if the response is successful (status 200-299)
        if (response.ok) {
            // Show a success toast message
            toast.success("Menu updated successfully!");

            // Save the updated menu to localStorage
            localStorage.setItem("menuData", JSON.stringify(menus));

            console.log("Menu updated on server successfully!");
        } else {
            // Handle API errors (e.g., show an error message)
            const errorData = await response.json();
            console.error("Error updating menu:", errorData.message);
            toast.error("Failed to update menu.");
        }
    } catch (error) {
        console.error("Error in handleSubmit:", error);
        toast.error("Failed to update menu.");
    }
};


  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Edit Menu
      </Typography>
      <EditMenuTable
        menus={menus}
        onMenuChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
