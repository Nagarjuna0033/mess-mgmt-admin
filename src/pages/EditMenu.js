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
  Typography,
} from "@mui/material";
import { menu_items } from "./ChangeMenu";

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
              <TableCell>
                <TextField
                  fullWidth
                  value={menu.breakfast}
                  onChange={(e) => onMenuChange(e, dayIndex, "breakfast")}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={menu.lunch}
                  onChange={(e) => onMenuChange(e, dayIndex, "lunch")}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={menu.snacks}
                  onChange={(e) => onMenuChange(e, dayIndex, "snacks")}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={menu.dinner}
                  onChange={(e) => onMenuChange(e, dayIndex, "dinner")}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="center">
              <Button variant="contained" color="secondary" onClick={onSubmit}>
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
  const [menus, setMenus] = useState(menu_items);

  const handleInputChange = (e, dayIndex, mealType) => {
    const updatedMenus = [...menus];
    updatedMenus[dayIndex][mealType] = e.target.value;
    setMenus(updatedMenus);
  };

  const handleSubmit = () => {
    console.log("Updated Menu Items:", menus);
    alert("Menu updated successfully!");
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
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
