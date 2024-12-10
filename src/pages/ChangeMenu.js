import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const menu_items = [
  { day: "Monday", breakfast: "Pancakes, Scrambled eggs", lunch: "Grilled chicken, Rice", snacks: "Chips, Fruit", dinner: "Spaghetti, Salad" },
  { day: "Tuesday", breakfast: "Omelette, Toast", lunch: "Vegetable curry, Rice", snacks: "Cookies, Fruit", dinner: "Pizza, Caesar salad" },
  { day: "Wednesday", breakfast: "Cereal, Milk", lunch: "Chicken curry, Rice", snacks: "Crackers, Cheese", dinner: "Grilled fish, Broccoli" },
  { day: "Thursday", breakfast: "French toast, Bacon", lunch: "Beef stir-fry, Noodles", snacks: "Nuts, Granola bar", dinner: "Burger, Fries" },
  { day: "Friday", breakfast: "Porridge, Toast", lunch: "Grilled salmon, Quinoa", snacks: "Pretzels, Yogurt", dinner: "Sushi, Edamame" },
  { day: "Saturday", breakfast: "Waffles, Syrup", lunch: "Vegetable stir-fry, Rice", snacks: "Trail mix, Cheese", dinner: "Steak, Mashed potatoes" },
  { day: "Sunday", breakfast: "Bagels, Fruit salad", lunch: "Pasta, Garlic bread", snacks: "Popcorn, Muffins", dinner: "Roast chicken, Vegetables" },
];

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
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
            {menu_items.map((menu, index) => (
              <TableRow key={index}>
                <TableCell>{menu.day}</TableCell>
                <TableCell>{menu.breakfast}</TableCell>
                <TableCell>{menu.lunch}</TableCell>
                <TableCell>{menu.snacks}</TableCell>
                <TableCell>{menu.dinner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
