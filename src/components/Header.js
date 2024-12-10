import * as React from "react";
import Stack from "@mui/material/Stack";
import rguktLogo from "../images/rguktLogo.png"
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import { useNavigate } from "react-router-dom";

import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";

import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 2 }}
      >
        <Box component="img"
          src={rguktLogo}
          alt="Mess Logo"
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />
        <Typography
          sx={{
           
            fontSize: '1.5rem', 
            fontWeight: 'bold'
          }}
        >
          RGUKT Mess Management System
        </Typography>
      </Box>
      
      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
