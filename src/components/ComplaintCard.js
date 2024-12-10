import React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ComplaintCard({ complaints, index }) {
  const [expanded, setExpanded] = React.useState(index === 0 && 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography>{complaints.shortMsg}</Typography>
            <Button id="basic-button" disabled>
              {complaints.status}{symb[complaints.status]}
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {/* Flexbox Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 2, // Space between items
            }}
          >
            {/* Fixed Width Image */}
            <Box
              sx={{
                flexShrink: 0, // Prevent the image box from shrinking
                width: "500px", // Fixed width
              }}
            >
              <img
                src={complaints.img}
                alt="Complaint"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>

            {/* Dynamic Content */}
            <Box sx={{ flex: 1 }}>
              {complaints.status !== "Done" && (
                <Box sx={{ mb: 2 }}>
                  <Button
                    id="status-button"
                    aria-controls={open ? "status-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Status
                  </Button>
                  <Menu
                    id="status-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "status-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Done</MenuItem>
                    <MenuItem onClick={handleClose}>In Progress</MenuItem>
                    <MenuItem onClick={handleClose}>Pending</MenuItem>
                  </Menu>
                </Box>
              )}
              <h3>Complaint Came from Mess 2</h3>
              <Typography>{complaints.desc}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const symb = {
  "Done": "✅",
  "In Review":"🕒",
  "Pending":"❌"
}