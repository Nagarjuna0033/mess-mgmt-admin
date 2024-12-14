import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function OfficialDetailsCard({ officials }) {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, boxShadow: 3 }}>
      <CardContent>
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Official Details
        </Typography>
        <Stack direction="column" spacing={2} sx={{ paddingTop: "15px" }}>
          {officials.map((official, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "12px",
                borderRadius: 1,
                backgroundColor:
                  index % 2 === 0 ? theme.palette.action.hover : "transparent",
                boxShadow: 1,
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                  boxShadow: 3,
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                {official.name} - {official.designation}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EmailIcon fontSize="small" sx={{ marginRight: "5px" }} />
                  {official.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PhoneIcon fontSize="small" sx={{ marginRight: "5px" }} />
                  {official.phone}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

OfficialDetailsCard.propTypes = {
  officials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OfficialDetailsCard;
