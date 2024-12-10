import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
const Profile = () => {
  const navigate = useNavigate();
  const profile = {
    name: "J.Revanth Kumar",
    designation: "Director",
    mail: "director@rguktrkv.ac.in",
    mobileNumber: "9030808053",
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          Profile Details
        </Typography>
        <TextField
          label="Name"
          value={profile.name}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          label="Designation"
          value={profile.designation}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          label="Email"
          value={profile.mail}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          label="Mobile"
          value={profile.mobileNumber}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
      </Stack>

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
