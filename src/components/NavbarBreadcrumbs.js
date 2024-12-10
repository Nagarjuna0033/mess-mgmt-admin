import * as React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import StyledBreadcrumbs from "@mui/material/Breadcrumbs"; // Ensure this is correctly imported
import Typography from "@mui/material/Typography";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded"; // For breadcrumb separator

export default function NavbarBreadcrumbs() {
  const location = useLocation(); // Get current location (path)

  // Function to map the current path to breadcrumb names
  const getBreadcrumbs = (path) => {
    switch (path) {
      case "/":
        return ["Dashboard", "Home"];
      case "/current-issues":
        return ["Dashboard", "Current Issues"];
      case "/all-complaints":
        return ["Dashboard", "All Complaints"];
      case "/analytics/overall":
        return ["Dashboard", "Analytics", "Overall Analytics"];
      case "/analytics/mess-wise":
        return ["Dashboard", "Analytics", "Mess Wise Analytics"];
      case "/analytics/complaints":
        return ["Dashboard", "Analytics", "Complaints Analytics"];
      case "/analytics/feedback":
        return ["Dashboard", "Analytics", "Feedback Analytics"];
      case "/menu":
        return ["Dashboard", "Menu"];
      case "/editIncharge":
        return ["Dashboard", "Edit InCharge"];
        case "/menu-change":
          return ["Dashboard", "Edit Menu"];
        case "/editIncharge":
          return ["Dashboard", "Edit InCharge"];
      default:
        return ["Dashboard", "Unknown"];
    }
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((text, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{ color: index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary', fontWeight: index === breadcrumbs.length - 1 ? 600 : 400 }}
        >
          {text}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
