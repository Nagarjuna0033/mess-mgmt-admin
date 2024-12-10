import React, { useState } from 'react';
import { menu_items } from './ChangeMenu';
import { Button } from '@mui/material';

export default function EditMenu() {
  const [menus, setMenus] = useState(menu_items);

  const handleInputChange = (e, dayIndex, mealType) => {
    const updatedMenus = [...menus];
    updatedMenus[dayIndex][mealType] = e.target.value;
    setMenus(updatedMenus);
  };

  const handleSubmit = () => {
    console.log("Updated Menu Items:", menus);
    // Here, you can send the updated menus to your backend or handle them accordingly.
  };

  return (
    <div style={{ padding: '20px', width: "100%" }}>
      <h2>Edit Menu</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'left',
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
          {menus.map((menu, dayIndex) => (
            <tr key={dayIndex}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {menu.day}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  value={menu.breakfast}
                  onChange={(e) => handleInputChange(e, dayIndex, 'breakfast')}
                  style={{ width: '100%', padding: '5px' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  value={menu.lunch}
                  onChange={(e) => handleInputChange(e, dayIndex, 'lunch')}
                  style={{ width: '100%', padding: '5px' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  value={menu.snacks}
                  onChange={(e) => handleInputChange(e, dayIndex, 'snacks')}
                  style={{ width: '100%', padding: '5px' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  value={menu.dinner}
                  onChange={(e) => handleInputChange(e, dayIndex, 'dinner')}
                  style={{ width: '100%', padding: '5px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="contained"
        color="secondary" onClick={handleSubmit}>
        Submit Changes
      </Button>
    </div>
  );
}
