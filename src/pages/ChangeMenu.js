import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const menu_items = [
  {
    day: "Monday",
    breakfast: "Pancakes, Scrambled eggs, Toast, Coffee",
    lunch: "Grilled chicken, Rice, Steamed vegetables, Fruit salad",
    snacks: "Chips, Fruit, Biscuits",
    dinner: "Spaghetti, Garlic bread, Salad, Ice cream"
  },
  {
    day: "Tuesday",
    breakfast: "Omelette, Toast, Butter, Tea",
    lunch: "Vegetable curry, Rice, Chapati, Cucumber salad",
    snacks: "Cookies, Fruit, Yogurt",
    dinner: "Pizza, Garlic bread, Caesar salad, Pudding"
  },
  {
    day: "Wednesday",
    breakfast: "Cereal, Milk, Banana, Orange juice",
    lunch: "Chicken curry, Rice, Raita, Mango chutney",
    snacks: "Crackers, Cheese, Apple slices",
    dinner: "Grilled fish, Roasted potatoes, Broccoli, Brownie"
  },
  {
    day: "Thursday",
    breakfast: "French toast, Bacon, Sausages, Coffee",
    lunch: "Beef stir-fry, Noodles, Sautéed vegetables, Pineapple",
    snacks: "Nuts, Granola bar, Carrot sticks",
    dinner: "Burger, Fries, Coleslaw, Milkshake"
  },
  {
    day: "Friday",
    breakfast: "Porridge, Boiled eggs, Toast, Green tea",
    lunch: "Grilled salmon, Quinoa, Asparagus, Mixed greens",
    snacks: "Pretzels, Yogurt, Grapes",
    dinner: "Sushi, Miso soup, Edamame, Mochi"
  },
  {
    day: "Saturday",
    breakfast: "Waffles, Syrup, Bacon, Orange juice",
    lunch: "Vegetable stir-fry, Rice, Tofu, Mango smoothie",
    snacks: "Trail mix, Cheese sticks, Banana",
    dinner: "Steak, Mashed potatoes, Green beans, Cheesecake"
  },
  {
    day: "Sunday",
    breakfast: "Bagels, Cream cheese, Fruit salad, Coffee",
    lunch: "Pasta, Tomato sauce, Parmesan, Garlic bread",
    snacks: "Popcorn, Fruit, Muffins",
    dinner: "Roast chicken, Roasted vegetables, Gravy, Apple pie"
  }
];

export default function Menu() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '20px' }}>

      <Button variant="contained"
        color="secondary" onClick={() => { navigate("/menu-change") }}>
        Change Menu
      </Button>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'left'
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Day</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Breakfast</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Lunch</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Snacks</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {menu_items.map((menu, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{menu.day}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{menu.breakfast}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{menu.lunch}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{menu.snacks}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{menu.dinner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
