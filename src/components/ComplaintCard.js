import React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Modal from "@mui/material/Modal";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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

export default function ComplaintCard({ complaint, index, getAllComplaints }) {
  const [expanded, setExpanded] = React.useState(index === 0 && 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [option, setOption] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setModelOpen(true);
    setAnchorEl(null);
  };
  const handleModelClose = () => {
    setModelOpen(false);
  };
  const handleOption = (option) => {
    setOption(option);
    handleClose();
  };
  const handleSingleResolve = async (id) => {
    try {
      console.log(id);
      const res = await axios.get(
        `https://us-central1-mess-management-250df.cloudfunctions.net/resolveComplaint?id=${id}&status=${option}`
      );
      console.log(res);
      if (res.status === 200) {
        alert("document updated successfully");
        getAllComplaints();
      } else {
        alert("failed to udpate document status");
      }
      handleModelClose();
    } catch (error) {
      handleModelClose();
    }
  };

  return (
    <Box>
      <Modal
        open={modelOpen}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to update document to stauts {option}?
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleSingleResolve(complaint.id);
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
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
            <Typography>
              {complaint.title} {"   "} #{complaint.category}
            </Typography>
            <Button id="basic-button" disabled>
              {complaint.status}
              {symb[complaint.status]}
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: "500px",
              }}
            >
              <img
                src={complaint.uploadUrl}
                alt="Complaint"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              {complaint.status !== "done" && (
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
                    {getFilter(complaint.status).map((option) => {
                      return (
                        <MenuItem
                          key={option}
                          onClick={() => {
                            handleOption(option);
                          }}
                        >
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Box>
              )}
              <h3>Complaint Came from Mess 2</h3>
              <Typography>{complaint.description}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const symb = {
  done: "✅",
  "In Review": "🕒",
  progress: "❌",
};

const getFilter = (param) => {
  if (param === "done") {
    return ["progress"];
  } else if (param === "progress") {
    return ["done"];
  } else {
    return ["progress", "done"];
  }
};
