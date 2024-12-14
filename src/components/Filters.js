import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CheckboxesTags({ setCategory, category }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(category);
  }, [category]);
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setCategory(selectedValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Filters</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Hygiene">Hygiene</MenuItem>
          <MenuItem value="neatness_cleanliness">
            Neatness/Cleanliness (tables, surroundings)
          </MenuItem>
          <MenuItem value="food_quality">Food Quality</MenuItem>
          <MenuItem value="taste_of_curries">Taste of Curries</MenuItem>
          <MenuItem value="snacks_tea_coffee_breakfast">
            Snacks, Tea, Coffee, and Breakfast
          </MenuItem>
          <MenuItem value="quantity_of_food">
            Quantity of Food as per Menu
          </MenuItem>
          <MenuItem value="employee_courtesy">Employee Courtesy</MenuItem>
          <MenuItem value="uniform_wearing">
            Uniform Wearing by Employees
          </MenuItem>
          <MenuItem value="cooking_as_per_menu">Cooking as per Menu</MenuItem>
          <MenuItem value="cleanliness_of_wash_basins">
            Cleanliness of Wash Basins and Wash Area
          </MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
