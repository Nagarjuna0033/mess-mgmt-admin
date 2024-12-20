import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({ onChange, type = "text", value }) {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "100%" } }} variant="outlined">
      <OutlinedInput
        id="search"
        placeholder="Search for email…"
        type={type}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon />
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
