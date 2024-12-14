import React, { useState } from "react";
import { Button, Box } from "@mui/material";

export const LoginPrompt = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        animation: "slideIn 1s ease-out",
        "@keyframes slideIn": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log("Redirect to Login")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          px: 3,
          py: 1,
          borderRadius: 2,
          transition: "transform 0.3s ease, background-color 0.3s ease",
          backgroundColor: hovered ? "#0056b3" : "#1976d2",
          "&:hover": {
            backgroundColor: "#004ba0",
            transform: "scale(1.1)",
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};
